export * from './cardSelectors';
export * from './playerSelectors';
export * from './turnSelectors';
export * from './gameStateSelectors';
export * from './effectSelectors';
export * from './roundSelectors';
export * from './formSelectors';
export * from './clientSelectors.js';

/*
  Home of all selectors for Redux.
  The selectors are used to derive certain parts of the state by either simply retrieving parts,
  or computing new information. They can also be used to return several values at once from one selector.
  They are used with the useSelector hook throughout the project.
  Both reselect and re-reselect have been used in order to optimize performance.They let you retrieve cached
  results instead of computing the state each time, which can be intensive for e.g. arrays. 
  Reselect is used where the selector will only be instantiated once, meaning where there is only a single 
  component using it. However, if there are several instances of the same selector, the re-reselect 
  createCachedSelector function is used. Here, each selector is given an id to easily identify it. 
*/