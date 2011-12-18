Analytics = {
  record: function(name) {
    $.ajax({url: "http://hopscotch-data.herokuapp.com/analytics", data: {event: name},  type: "POST"})
  }
}
