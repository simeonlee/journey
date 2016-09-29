export const getWeek = week => {
  var results = [];
  week *= -7;
  var d = new Date();
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  var cur = new Date(d.setDate(diff - week));
  
  results.push((cur.getMonth() + 1) + '/' + cur.getDate());
  for (var i = 0; i < 6; i++) {
    cur = new Date(cur.setDate(cur.getDate()+ 1));
    results.push((cur.getMonth() + 1) + '/' + cur.getDate());
  }
  return results;
}