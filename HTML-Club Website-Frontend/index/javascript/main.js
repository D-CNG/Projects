/*change font size*/
function changeSize(c)
{/*collect all elements to be changed*/
	var desChange = document.getElementsByTagName("td");
	for(var i = 0 ;i<desChange.length;i++)
	{
		desChange[i].className = c
	}
	document.getElementsByTagName("body")[0].className = c
};
/*calling the function only after html has loaded*/
window.onload = function()
{
	document.getElementById("smallA").onclick =function (){changeSize("small")};

	document.getElementById("mediumA").onclick = function(){changeSize("medium")};

	document.getElementById("largeA").onclick = function(){changeSize("large")};
}


/*slideshow */
/*referenced : https://www.w3schools.com/howto/howto_js_slideshow.asp */
// Next/previous controls
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) 
{
  showSlides(slideIndex += n);
}

function currentSlide(n) 
{
  showSlides(slideIndex = n);
}

function showSlides(n) 
{
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) 
	{
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) 
	{
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
};

/*table filter*/
function myFunction() 
{
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("resourceTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) 
	{
    td = tr[i].getElementsByTagName("td")[0];
    if (td) 
		{
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) 
			{
        tr[i].style.display = "";
      } 
			else 
			{
        tr[i].style.display = "none";
      }
    }       
  }
}

/*top scroll button js*/
/*referenced: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp*/
//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() 
{
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) 
	{
    mybutton.style.display = "block";
  } 
	else 
	{
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() 
{
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
