var VERSION = 2
var Analytics = {
  init: function() {
    var unsentAnalytics = JSON.parse(localStorage.getItem("unsentAnalytics"));
    var newUnsentAnalytics = [];
    if ($.isArray(unsentAnalytics)) {
      _.each(unsentAnalytics, function(analytic) {
        $.ajax({
          url: "http://hopscotch-data.herokuapp.com/analytics",
          data: {event: "v" + VERSION + "_" + analytic},
          type: "POST",
          error: function() {
            newUnsentAnalytics.push(analytic);
            localStorage.setItem("unsentAnalytics", JSON.stringify(newUnsentAnalytics));
          },
          complete: function() {
            localStorage.setItem("unsentAnalytics", JSON.stringify(newUnsentAnalytics));
          }
        });
      });
    }
  },
  record: function(name) {
    $.ajax({
      url: "http://hopscotch-data.herokuapp.com/analytics",
      data: {event: name},
      type: "POST",
      error: function() {
        var unsentAnalytics = JSON.parse(localStorage.getItem("unsentAnalytics"));
        if (unsentAnalytics == null) {
          unsentAnalytics = [];
        }
        unsentAnalytics.push(name);
        localStorage.setItem("unsentAnalytics", JSON.stringify(unsentAnalytics));
        var unsentAnalytics = JSON.parse(localStorage.getItem("unsentAnalytics"));
      }
    });
  }
}
