function sum(a) {
  var sum = 0;
  for (var i = 0; i < a.length; i++)
    sum += a[i];
  return sum;
}

// Returns the "largest" cycle_type starting with k from Sn. "Largest" ends up being as many concatenating k-cycles as possible.
function start(k, n){
  if (n == 0)
    return [];

  if (k > n) {
    return [n];
  }

    // Assume k <= n
    var out = [];
    var sums = sum(out);

    // Output is basically just [k,...,k, k%n]
    while (sums != n) {
        out.push(k);
        sums = sums + k;
        if (sums + k > n) {
          if (n-sums != 0) {
            out.push(n-sums);
          }
          return out;
        }
    }
    return out;
}



// Given a cycle of type x, returns the next smallest cycle type in enumeration.
function next_element(x, n) {

  // Running example: (5,5,1,1,1)

  // Find first index that is not 1.
    var l = x.length - 1;
    while (l != 0 && x[l] == 1) {
        l -= 1; //sorted list, so should do binary search
    }

    // Reached the end (i.e. x = (1,1,1,....) ).
    if (l == 0 && x[0] == 1) {
        return null;
    }

    // Special case when the first element changes from x to successor.
    // Use a helper function.
    if (l == 0 && x[0] > 0) {
        return start(x[l] - 1, n);
    }

    var out = x.slice(0, l+1); // Get elements of x that are not 1.
   
    // Decrease smallest non-one element.
    out[l] = out[l]-1;

    // out needs to sum to n. So we compute sum of remaining elements of out.
    var m = n-sum(out);

    // concatenate with the "largest" cycle type of S_m. Also know that first element is at most out[l] 
    return out.concat(start(out[l], m));

    var out = x.slice();
    out[l] -= 1;

    // Takes the 1 and puts it at the end; e.g. (6,2,1) --> (6,1,1,1)
    if (out[l] == 1 || l == x.length - 1) {
        out.push(1)
    }
    // Otherwise adds the one the the adjacent location; e.g. (6,4,1) --> (6,3,2)
    else
        out[l+1] += 1;
    return out;
}

// Returns all the cycle types of Sn.
function cycle_types(n) {

    var l = [[n]];
    var z = next_element([n], n);
    while (z != null) {
        l.push(z);
        z = next_element(z, n);
    }
    return l;
}

function lcm(a) {
    var l = a[0];
    for (var i = 1; i < a.length; i++) {
        l = l*Math.floor(a[i]/gcd(l, a[i]));
    }
    return l;
}

function gcd_alt(a,b) {
    var r,i;
    while(b != 0) {
        r = a % b;
        a = b;
        b = r;
    }
    return a;
  }

  function gcd(a,b) {
      a = Math.abs(a)
      b = Math.abs(b)
      return (b == 0) ? a : gcd(b, a%b);
    }

function choose(n, k) {
    return Math.floor(fact(n)/(fact(n-k)*fact(k)));
}

var f = {};

function fact(k) {
    if (k <= 0 || k == null)
        return 1;
    if (k in f)
        return f[k];
    f[k] = k*fact(k-1);
    return f[k];
}

// Returns the number of elements of the cycle_type.
function number_of_elements(cycle_type, n) {
  // A counting dictionary that stores the number of k-cycles for each valid size k.  
  var d = {};

  var out = 1;

  // The number of elements of the permutation remaining that haven't been assigned.
  var left = n;
 
  for (var z = 0; z < cycle_type.length; z++) {
    var k = cycle_type[z];
        
    if (!(k in d))
      d[k] = 1;
    else
      d[k] += 1;

    // There are "left choose k" possibilities for how to choose the elements of this k-cycle, and (k-1)! possible ways to order the cycle. 
    out *= choose(left, k) * fact(k-1);
    left -= k;
  }

  // The above procedure overcounted, because the ordering of cycles of the same length should not matter. 
  for (k in d)
    out = out / fact(d[k]);

  return out;

  // Faster way:

  for (var z in cycle_type) {
    var k = cycle_type[z];
        
    if (!(k in d))
      d[k] = 1;
    else
      d[k] += 1;
  }


  //  https://groupprops.subwiki.org/wiki/Conjugacy_class_size_formula_in_symmetric_group

  var left = n
  for (k in d) {
    var m = d[k];
    out *= fact(left) / fact(left-km) / k**m / fact(m); // fact(left) / fact(left-km) : permutating km elements from what's left to determine the elements of our k-cycles (we have m of them).
                                                        // fact(m) : dividing out this to avoid double counting (the order of these k-cycles doesn't matter)
                                                        // k**m: dividing by k (m times for each cycle) so to avoid double counting permutations that are cyclically equivalent.
    left -= m*k; 
  }


}

var ds = {};
var outputs = {};

// Returns an html table of the cycle type, its order and number of elements of this cycle type.
function sn(n=null) {

    if (n == null) {
      n = parseInt(document.getElementById("myText").value);
    }
    if (n == NaN || !(n > 0) || n == null) {
      return "<tr style=\"all:revert;\"><th style=\"all:revert;\">Cycle types</th><th style=\"all:revert;\">order</th><th style=\"all:revert;\">Number of elements of this order</th></tr>";;
    }

    if (n in outputs) {
      return outputs[n];
    }

    if (n>20){
      return "<tr style=\"all:revert;\"><th style=\"all:revert;\">Cycle types</th><th style=\"all:revert;\">order</th><th style=\"all:revert;\">Number of elements of this order</th></tr>";// + "<tr style=\"all:revert;\"><th style=\"all:revert;\">Limited to \\(n \\le 20\\)</th><th style=\"all:revert;\"></th><th style=\"all:revert;\"> </th></tr>"
    }

    var d = {};
    var c = cycle_types(n);

    for (var i = 0; i < c.length; i++) {
        var y = c[i];
        d[y] = [lcm(y).toString(), number_of_elements(y, n).toString()];
    }
    var html = "";
    html += "<tr style=\"all:revert;\"><th style=\"all:revert;\">Cycle types</th><th style=\"all:revert;\">Order</th><th style=\"all:revert;\">Number of elements of this cycle type</th></tr>";

    for (fruit in d) {
        html += "<tr style=\"all:revert;\"><td style=\"all:revert;\">" + fruit.toString() + "</td>";
        html += "<td style=\"all:revert;\">" + d[fruit][0] + "</td>";
        html += "<td style=\"all:revert;\">" + d[fruit][1] + "</td>";
        html += "</tr>"
    }

    ds[n] = d;
    outputs[n] = html;
    return html;
}

// Returns an html table of order, and number of elements of the order.
function sn2() {
  var n = parseInt(document.getElementById("myText").value);
  if (n == NaN || !(n > 0) || n == null) {
    return "<tr style=\"all:revert;\"><th style=\"all:revert;\">Cycle types</th><th style=\"all:revert;\">Order</th><th style=\"all:revert;\">Number of elements of this cycle type</th></tr>";;
  }

  if (n > 20)
    return "<tr style=\"all:revert;\"><th style=\"all:revert;\">Cycle types</th><th style=\"all:revert;\">order</th><th style=\"all:revert;\">Number of elements of this order</th></tr>";

  if (!(n in ds)) {
    sn();
  }

  var d = ds[n];
  var orders = {};

  for (x in d) {

    var order = d[x][0];
    var count = d[x][1];

    if (!(order in orders)) {
      orders[order] = parseInt(count);
    }
    else {
      orders[order] += parseInt(count);
    }
  }

  var html = "";
  html += "<tr style=\"all:revert;\"><th style=\"all:revert;\">Order</th><th style=\"all:revert;\">Number of elements of this order</th></tr>";

  for (fruit in orders) {
      html += "<tr style=\"all:revert;\"><td style=\"all:revert;\">" + fruit.toString() + "</td>";
      html += "<td style=\"all:revert;\">" + orders[fruit].toString() + "</td>";
      html += "</tr>"
  }

  return html;
}
