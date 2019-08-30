//for the details page.
//Objs is the array of the object info from /api/courses/
$(function() {
    let objs;
    let urlParams = new URLSearchParams(location.search);
    let urlID = urlParams.get("id");
    
    $.urlParam = function(name){
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }
    $("#courselink").attr("href", "courses.html?" + "instr=" + $.urlParam('instr') );
    $.getJSON("/api/courses/" + urlID, function(classes) {
      // the returned data is available in an "already parsed"
      // parameter named data
      // take a few minutes to examine the attached .json file
      objs = classes;
      //assigns the url for the register button and gets the click function ready.
      /*
      Below function finds if the student is an instructor. If they are not, they get a non editable table.
      If they are an instructor they find a input field that can be edited.
      */
      if ($.urlParam('instr') == "No")
      {
        populateTableInfo(objs, urlID);
        $("#register").attr("href", "register.html?id=" + objs.CourseId + "&instr=" + $.urlParam('instr') );
        $("#register").click(function() {
          document.location.href = "register.html?id=" + objs.CourseId + "&instr=" + $.urlParam('instr');
        });
      } else 
      {
        $("#register").html('Save');
        createInstrTable(objs);
        showStudents(objs);
        $("#register").attr("href", "courses.html?" + "instr=" + $.urlParam('instr') );
  
        //on the "save" / register button click
      }
    });
  
  
  $("#register").click(function() 
  {
    let isok = validateForm();
      if (isok == false)
      {
        return false;
      }
      $.ajax({
        url: '/api/courses', // your api url
        // jQuery < 1.9.0 -> use type
        // jQuery >= 1.9.0 -> use method
        data: $("#courseInfo").serialize(),
        method: 'PUT', // method is any HTTP method
        success: function() {
          alert("Class has been updated");
          document.location.href = "courses.html?" + "instr=" + $.urlParam('instr');
        }
      });
  });
        
      //gets the cancle fucntion ready so it takes the user back to the courses html page.
      $("#cancel").click(function() {
        document.location.href = "courses.html?" + "instr=" + $.urlParam('instr');
      });
  });
  
  /*This function creates the table for the detail page.
   *
   *
   *@param ---register--- is the register button.
   *@param ---students--- is the student table.
   *@param ---detailtbl--- is the table for the class information.
   *@param ---cancel--- is the cancel button.
   *@param ---objs--- is the object array.
   */
  function populateTableInfo(objs, urlID) {
      $(".instrYes").hide();
      let table = document.getElementById("detailtbl");
      table.innerHTML = "";
      //generates the table.
      let row = table.insertRow(table.rows.length);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerHTML = "Course ID";
      cell2.innerHTML = urlID;
      populateTable(table, row, objs);
      showStudents(objs);
  }
  
  /*This function shows the student table informaiton..
   *
   *
   *@param ---tbody is the table body.
   *@param ---markup--- is the student table information.
   *@param ---StudentName--- is the student name.
   *@param ---Email--- is the student email.
   */
  function showStudents(objs) {
    if (objs.Students.length == 0) {
      $("#students").html("<table> <tr><td>No Students have Registered</td></td> </table>");
    } else {
      let tBody = $("<tbody>");
      $("#students").append(tBody);
      for (let i = 0; i < objs.Students.length; i++) {
        let markup =
          "<tr><td name=studentname" + [i] + ">" +
          objs.Students[i].StudentName +
          "</td><td name=email>" +
          objs.Students[i].Email +
          "</td><td class='detailbtn'>" +
          '<input type="button" id=' + [i] + ' class="delete" value="Unregister"/>' +
          "</td></tr>";
        $("#students tbody").append(markup);
  
        //hide delete button if user is not instructor
        if ($.urlParam('instr') == "No")
        {
          $(".detailbtn").hide();
        }
        
        //on delete click, delete specific student.
        $("#" + [i]).click(function(){
          result = window.confirm("Click Ok to Remove Student from the class.");
          if (result == true)
          {
            $.ajax({
              url: "/api/unregister",
              type: 'post',
              data: 
              {
                "studentname": objs.Students[i].StudentName,
                "email": objs.Students[i].Email,
                "courseid": objs.CourseId,
              },
              success: function() {
                document.location.href = "details.html?id=" + objs.CourseId + "&instr=" + $.urlParam('instr');
              }
            });
          }
        });
      }
    }
  }
  
  /*This function populates the main table information.
  It loops through all of the informaiton and displays it via 2 arrays.
   *
   *@param ---innerHTMLInfo--- contains all the different catagory information.
   *@param ---header--- contains the heading for all the tables.
   */
  function populateTable(table, row, objs) {
    let innerHTMLInfo = [
      objs.Title,
      objs.Category,
      objs.Location,
      objs.StartDate,
      objs.EndDate,
      objs.Meets,
      objs.Fee
    ];
  
    let header = [
      "Title",
      "Category",
      "Location",
      "Start Date",
      "End Date",
      "Meets",
      "Fee"
    ];
  
    for (let j = 0; j < header.length; j++) {
      row = table.insertRow(table.rows.length);
      cell1 = row.insertCell(0);
      cell2 = row.insertCell(1);
      cell1.innerHTML = header[j].toString();
      cell2.innerHTML = innerHTMLInfo[j].toString();
      $( 'table tbody tr td:last-child').addClass( 'editable' );
    }
  }
  
  
  function createInstrTable(objs)
  {
    $("#courseid").val(objs.CourseId);
    $("#title").val(objs.Title);
    $("#category").val(objs.Category);
    $("#location").val(objs.Location);
    $("#startdate").val(objs.StartDate);
    $("#enddate").val(objs.EndDate);
    $("#meets").val(objs.Meets);
    $("#fee").val(objs.Fee);
  }
  
  /*This function validates the input text for the changing classes.
  *
  *
  *@param ---errMsg--- is the array of error messages.
  *@param ---errorMessages--- is the html ul.
  */
  function validateForm()
  {
      let errMsg = [];
  
      $.getJSON("/api/courses/", function(classes) 
      {
          // the returned data is available in an "already parsed"
          // parameter named data
          // take a few minutes to examine the attached .json file
          objs = classes;
          console.log(objs.length)
          for (let i = 0; i < objs.length; i++)
          {
              console.log("hi")
              if ($("#courseid").val().trim() == objs[i].CourseId)//validation for courseID
              {
                  errMsg[errMsg.length] = "Course ID is already in use.";
              }
          }
      });
  
      if ($("#courseid").val().trim() == "")//validation for title
      {
          errMsg[errMsg.length] = "Course ID is required";
      }
      if ($("#title").val().trim() == "")//validation for title
      {
          errMsg[errMsg.length] = "Title is required";
      }
      if ($("#location").val().trim() == "") //validation for location
      {
          errMsg[errMsg.length] = "Location is required";
      }
      let dateReg = /^\d{2}\/\d{2}\/\d{2}$/
      if (dateReg.test($("#startdate").val()) == false || dateReg.test($("#enddate").val()) == false ) //validation for start & end date.
      {
          errMsg[errMsg.length] = "Date must be MM/DD/YY formatd";
      }
      if ($("#meets").val().trim() == "") //validation for Meets
      {
          errMsg[errMsg.length] = "Meeting days are required";
      }
      if ($("#fee").val().trim() == "") //validation for Meets
      {
          errMsg[errMsg.length] = "Fee is required";
      }
  
      if (errMsg.length == 0)
      {
          return true;
      }
      $("#ulMsg").empty();//this is for msgDiv not 
      for(let i=0; i < errMsg.length; i++)
      {
          $("<li>" + errMsg[i] + "</li>").appendTo($("#ulMsg"));
      }
      return false;
  }
  
  