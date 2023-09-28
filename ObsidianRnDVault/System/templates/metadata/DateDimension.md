datedim:
- year: <% tp.date.now("YYYY") %>
- quarter: <% tp.date.now("Q") %>
- month: <% tp.date.now("MM") %>
- day: <% tp.date.now("DD") %>
- dayofweek: <% tp.date.now("e") %>
- weekyear: <% tp.date.now("gggg") %>
- week: <% tp.date.now("WW") %>
- season: <% tp.user.getSeasonForDate(moment().format("YYYY-MM-DD")) %>