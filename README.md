# List_Lambda_js
List class with Lambda like c# with select, where, first (condition), last(condition), distinct, each, etc.

*It is equal to C# IList methods because you have minimal interactions even performing consecutive calls!*

####demos: http://jsfiddle.net/ohrlando/Lu6c4dkx/

## List class to javascript like c# List with lambda methods:
### select, where, any (filter condition), each (function)
### first, first(filter condition), last, remove (index), add, addRange(Array), slice
### And new distinct objects and distinct string/int, 


###It works fine with *jQuery* (see the samples at jsfiddle)


*Array, List, c#, IEnumerable, Lambda, Action, Javascript, js*


# Release Notes
- 1.3.0
  - improve performance on distinct.
  - added callback's data (used by distinct)

- 1.2.1
  - fixed bug - index was undefined for "each", "select" and "where" methods

- 1.2.0
  - fixed bugs, added distinct 

- 1.1.0
  - Added last, first
