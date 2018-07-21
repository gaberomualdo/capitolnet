(function(){
  const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  let returnHTML = "<style>@media (max-width: " + (110*remSize) + "px){ .main_content{ width: 75rem } } @media (max-width: " + (74*remSize) + "px){ .main_content{ width: 36.5rem } }</style>";
  document.write(returnHTML);
})();
