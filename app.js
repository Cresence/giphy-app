// / Initial array of gifs
      var gifs = [];

      // displaygifInfo function re-renders the HTML to display the appropriate content
      function displaygifInfo() {

        var input = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        input + "&api_key=UjyZXdc654lz1qPPgecoyt1IHqWG1xnz&limit=3  ";
        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

        //   // Creating a div to hold the gif
        //   var gifDiv = $("<div class='gif'>");

        //   // Storing the rating data
        //   var rating = response.Rated;

        //   // Creating an element to have the rating displayed
        //   var pOne = $("<p>").text("Rating: " + rating);

        //   // Displaying the rating
        //   gifDiv.append(pOne);

        //   // Storing the release year
        //   var released = response.Released;

        //   // Displaying the release year
        //   gifDiv.append(pTwo);

        //   // Appending the plot
        //   gifDiv.append(pThree);

        //   // Retrieving the URL for the image
        //   var imgURL = response.Poster;

        //   // Creating an element to hold the image
        //   var image = $("<img>").attr(results[i].images.fixed_height.url);

        //   // Appending the image
        //   gifDiv.append(image);

        //   // Putting the entire gif above the previous gifs
        //   $("#gifs-view").prepend(gifDiv);
        var results = response.data;

        if ($(this).attr("data-name")) {
            for (var i = 0; i < results.length; i++) {
                $("#gifs-view").empty();
                
    
                // Creating and storing a div tag
                var gifDiv = $("<div>").attr('class', "data-name " + this);
    
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
    
                // Creating and storing an image tag
                var gifImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                gifImage.attr("src", results[i].images.fixed_height.url);
    
                // Appending the paragraph and image tag to the gifDiv
                gifDiv.append(p);
                gifDiv.append(gifImage);
    
                // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-view").prepend(gifDiv);
              }
            gifDiv = null;
          } else {
            gifDiv = $( "p" ).detach();
          }

          for (var i = 0; i < results.length; i++) {
            // $("#gifs-view").remove();
            

            // Creating and storing a div tag
            var gifDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the gifDiv
            gifDiv.append(p);
            gifDiv.append(gifImage);

            // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-view").prepend(gifDiv);
          }

      })
    }
      // Function for displaying gif data
      function renderButtons() {

        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of gifs
        for (var i = 0; i < gifs.length; i++) {

          // Then dynamicaly generating buttons for each gif in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of gif-btn to our button
          a.addClass("gif-btn");
          // Adding a data-attribute
          a.attr("data-name", gifs[i]);
          // Providing the initial button text
          a.text(gifs[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
          $("#gif-input").empty();
        }
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

      // Adding a click event listener to all elements with a class of "gif-btn"
      $(document).on("click", ".gif-btn", displaygifInfo);

      $("gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
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