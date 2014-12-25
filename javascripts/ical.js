$.ajax({
            type: 'POST',
            contentType: "application/json",
            url: *****ics file*****,
            dataType: "json",
            async: false,
            success: function(result) {
                var cal, icalevents, dtstart, dtend, StrStart, StrEnd, StrID, StrAllDay, StrTitle, StrURL, StrLocation, StrDescription;
                $.each(result, function(key, val) {
                    try {
                        cal = $.parseIcs(val.url, AEFC.urls.externalfile);
						Alertify.log.success('ICS '+val.url);
                        icalevents = [];

                        for (i = 0; i < cal.event.length; i = i + 1) {
                            dtstart = cal.event[i].dtstart[0].value;
                            StrStart = dtstart.substring(0, 4) + '-' + dtstart.substring(4, 6) + '-' + dtstart.substring(6, 8);
                            if (dtstart.substring(9, 11) !== '') {
                                StrStart = StrStart + 'T' + dtstart.substring(9, 11) + '-' + dtstart.substring(11, 13) + '-' + dtstart.substring(13, 15);
                            }

                            dtend = cal.event[i].dtend[0].value;
                            StrEnd = dtend.substring(0, 4) + '-' + dtend.substring(4, 6) + '-' + dtend.substring(6, 8);
                            if (dtend.substring(9, 11) !== '') {
                                StrEnd = StrEnd + 'T' + dtend.substring(9, 11) + '-' + dtend.substring(11, 13) + '-' + dtend.substring(13, 15);
                            }

                            StrAllDay = StrStart.indexOf("T") === -1;
							
							if (cal.event[i].uid !== "undefined") { StrID = 'ICS'+AEFC.nbcalendars+'#'+cal.event[i].uid[0].value ;} 
							if (cal.event[i].summary !== "undefined") { StrTitle = cal.event[i].summary[0].value;} 
							//if (cal.event[i].url !== "undefined") { StrURL = cal.event[i].url[0].value;} 
							//if (cal.event[i].location!== "undefined") { StrLocation = cal.event[i].location[0].value;} 
							//if (cal.event[i].description !== "undefined") { StrDescription = cal.event[i].description[0].value;} 
							
                            icalevents.push({
                                id: StrID,
                                title: StrTitle,
                                url: StrURL,
                                start: StrStart,
                                end: StrEnd,
                                allDay: StrAllDay,
                                location: StrLocation,
                                description: StrDescription,
								editable:false,
								className: val.className,
								color: val.color,
								textColor: val.textColor
                            });
                        }
                        AEFC.source[AEFC.nbcalendars] = {
                            events: icalevents
                            //className: val.className,
                            //color: val.color,
                            //textColor: val.textColor
                        };
                    } catch (err) {
                        Alertify.log.error("ERROR loading (" + val.url + "): "+err);
					}
                });
            }
        }); // $.ajax(
