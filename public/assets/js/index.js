$(function() {
  // "path" may be "/1995-04-30"
  var path = location.pathname;
  var year = path.slice(1, 5);
  var month = path.slice(6, 8);
  var day = path.slice(9, 11);

  var start_ts = Math.floor(new Date(year, month - 1, day).getTime() / 1000);
  var now_ts = Math.floor(Date.now() / 1000);
  if (start_ts < 0 || now_ts < start_ts) {
    return;
  }

  var end_sec = 60 * 60 * 24 * 365 * 80;
  var now_sec = now_ts - start_ts;

  // 0.43321...
  var passed_rate = value_until(now_sec) / value_until(end_sec);

  // 43.3
  var passed_rate_normalized = (Math.floor(passed_rate * 1000) / 10);

  // 43
  var passed_rate_int = Math.floor(passed_rate_normalized);

  // 3
  var passed_rate_frac = passed_rate_normalized * 10 % 10;

  $('#clock .int').text(passed_rate_int);
  $('#clock .frac').text(passed_rate_frac);
});


function value_until(target_sec) {
  var ignored_sec = 60 * 60 * 24 * 365 * 8;

  var value = 0;
  for (var i = ignored_sec; i < target_sec; i += (60 * 60 * 24)) {
    value += recip(i);
  }

  return value;
}

// 逆数
function recip(cur) {
  return 1 / cur;
}
