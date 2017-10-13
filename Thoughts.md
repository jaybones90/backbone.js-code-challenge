##Tuesday:
 - Hours: 7
I've never worked with backbone.js before so I spent the first 3-4 hours reading documentation and tutorials trying to get an understanding of it all worked. I'm not familiar with the common way of organizing backbone projects but I've been teaching myself react and decided to take a component based approach to setting up the views. It was really tricky for me to get started as I didn't quite understand how the collection, views, and templates all worked so I spend the whole day just trying to get the data from the collection to render on the screen.
The errors I was getting in the console were very hard to debug when I first started. I realized later that I would get the same error for many different reasons but debugging became much easier as I became more familiar with the views and how they were being rendered.
I finally came across a stack overflow at like 10pm that made me understand that I wasn't rendering the template right and once I figured that out, it was game on.


##Wednesday and Thursday:
- Hours: 9-10
I setup subviews so I could pass the data down into each view from the top level ListContainerView.  Methods that would return the approved, pending, and rejected posts were added to the collection object. I was having trouble figuring out where the logic for the general data should reside and ending up placing it in the ListItemCollection object.
I was then able to call those methods from inside the GeneralDataView after passing the collection into it from the ListContainerView.

I created a PostListView component which was also instantiated inside of the ListContainerView. This  component housed the sort, search, and pagination functionality.

I needed someway of being able to customize the sort functionality on the collection so I added a sortingkey property that gets set as the user drop down selection.
The function I added in to achieve ascending/descending sorting seems to break the drop down filter sort function. The drop down filter works if you remove the `sortDirection` variable from the comparator function in the collection. I'm not very sure why this is happening but my next steps for tracking this down would be re-reading the documentation on the comparator method and plenty of stackoverflow/googling.

I setup the search function to accept a user input and perform a filter on the collection that returns models that have properties that match the user input.

The pagination was definitely the hardest to figure out. It took me forever to realize I needed to reset the collection each time the pagination method was called. Setting up a lastPage property was key to making sure the pagination ended and the next button greyed out at the appropriate place.

The PostViewList instantiates a PostView for each model in the collection. This is where I housed the functionality to check the status of the post, create a dialog box when the user clicks on a post, and show/hide the delete button, and to delete the post.

## Final Thoughts:
- Total Hours: 16-17
Since I did not know backbone before starting this project, I was definitely nervous going into it. The first day was rough but things started rocking by the second day and that's when I really began to realize how cool backbone was. Thanks for the opportunity to work on a fun challenge! Sorry for any bugs!
