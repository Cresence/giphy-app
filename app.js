setTimeout(annouce, 1000);
function annouce(){
  alert('Current ver. best viewed in full screen!');
}

// / Initial array of gifs
      var gifs = [];
      var favs = [];
      var favs = JSON.parse(localStorage.getItem('favs'));
    if (Array.isArray(favs) === false) {
        favs = [];
    }

      // displaygifInfo function re-renders the HTML to display the appropriate content
      function displaygifInfo() {

        var input = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        input + "&api_key=UjyZXdc654lz1qPPgecoyt1IHqWG1xnz&limit=10";
        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        var results = response.data;
        var imgCount = 0;
        // console.log(results.length);
        console.log(results);
        // randomGif = results[Math.floor(Math.random() * results.length) + 1];
        // console.log(randomGif);
          for (var i = 0; i < results.length; i++) {
            imgCount++;
            var still = results[i].images.fixed_width_still.url;
            var ani = results[i].images.fixed_width.url;  
            // $("#gifs-view").empty();
            // Creating and storing a div tag
            var gifDiv = $("<div id=newGif-" + imgCount + ">");
            // var gifDiv = $("<div class=gif>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p class=gif-rating>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            // gifImage.attr({src:"results[i].images.fixed_height.url", dataName:"results[i]"});
            gifImage.attr({
              src: still,
              "data-still": still,
              "data-animate": ani,
              "data-state": "still",
              class: "gif"
              });

            // Appending the paragraph and image tag to the gifDiv
            gifDiv.append(p);
            gifDiv.append(gifImage);

            // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-view").prepend(gifDiv);
          }
          console.log(still);
          console.log(ani); 
          // console.log("imgCount: " + imgCount);
          // console.log(typeof gifs);
          // var gifsStringed = JSON.stringify(gifs);
          // console.log(gifsStringed);
          // console.log(typeof gifsStringed);
          // localStorage.setItem('gifs', gifs);


      });
    }
      // Function for displaying gif data
      function renderButtons() {

        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons) 
        $("#buttons-view").empty();
        btnCount = 0;

        // Looping through the array of gifs
        for (var i = 0; i < gifs.length; i++) {
          btnCount++;
          // Then dynamicaly generating buttons for each gif in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of gif-btn to our button
          a.addClass("gif-btn " + "btn-" + btnCount);
          // Adding a data-attribute
          a.attr("data-name", gifs[i]);
          // Providing the initial button text
          a.text(gifs[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);

          console.log(gifs);
          $('#gif-input').empty();
        }
        console.log("btnCount = " + btnCount);
      }

      function noGifs() {
        $("#gifs-view").empty();
      }

      // This function handles events where a gif button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding gif from the textbox to our array
        gifs.push(gif);

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      function renderFavButtons() {
        favCount = 0;
        for (var i = 0; i < favs.length; i++) {
        favCount++;
        // Then dynamicaly generating buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of gif-btn to our button
        a.addClass("gif-btn " + "btn-" + favCount);
        // Adding a data-attribute
        a.attr("data-name", favs[i]);
        // Providing the initial button text
        a.text(favs[i]);
        // Adding the button to the buttons-view div
        $("#fav-view").append(a);
        }
        localStorage.getItem("favs");
        console.log(favs);  
        console.log("favCount = " + favCount);  
    }


      // Adding a click event listener to all elements with a class of "gif-btn"
      $(document).on("click", ".gif-btn", displaygifInfo);

      $("#fav").on("click", function(event){

        event.preventDefault();

        var favGif = $("#gif-input").val().trim();
        
        favs.push(favGif);
        console.log(btnCount);

        localStorage.setItem("favs", JSON.stringify(favs));
        renderFavButtons();
      });


      $('#clear').on('click', noGifs);

      // Experimental Method 1
      // $('#gifs-view:image').on('click', function(){
      //   console.log('Hi');
      // });
      // Experimental Method 2
      $(document).on('click', function(event) {
        if (event.target.tagName.toUpperCase() == 'IMG') {
          $('#imgSrc').val(event.target.src);
          var state = event.target.src;
        // console.log('This even works');
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
        //   console.log('IMG was clicked!');
          console.log(state);
          // changeState();
        }
      });
      // function changeState(){
      //   var state = event.target.src;
      //   if (state === "still") {
      //   $(this).attr("src", $(this).attr("data-animate"));
      //   $(this).attr("data-state", "animate");
      // } else {
      //   $(this).attr("src", $(this).attr("data-still"));
      //   $(this).attr("data-state", "still");
      // }
      // }
      // Borrowed Alternative Method
      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        console.log('This even works');
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      renderFavButtons();