# Introduction

XRedux is an upgrade for redux. Inspired by [dva](https://github.com/dvajs/dva) and [mirrorx](https://github.com/mirrorjs/mirror).

XRedux is not a framework like `dva` and `mirrorx`. It's just a plain libray and it solves the two problems that redux brought about.
  
  1. Following redux rules, we need create actions、reducers even more files. This will lead to mental leap.
  2. Redux didn't solve the async action.

For problem 1, dva propose model concept to solve the problems. We use model to converge initialState, action and reducer so we can only focus to model in development.

For problem 2, we use redux-thunk built in to deal with async action. About async problem you can see [Async Action](./async.md);

Why we don't use dva or mirror directly ?

[dva](https://github.com/dvajs/dva) or [mirror](https://github.com/mirrorjs/mirror) did provide good solution to solve this problems. But They has aslo react, react-router and other library built in. I think to solve the redux problem, we should only focus on data processing problem not provide a large and all inclusive solution. We should follow a single responsibility. So xredux only solves the problems that redux brought about. It can use in any framework without any dependence.

