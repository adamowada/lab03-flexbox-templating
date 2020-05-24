'use strict';

const dropDownArr = [];

function Image(image) {
  this.url = image.image_url;
  this.title = image.title;
  this.description = image.description;
  this.keyword = image.keyword;
  this.horns = image.horns;
}

// Use jQuery .clone() to render
// Use horns to sort as stretch goal later

Image.prototype.render = function () {
  // Clone image-template element
  let $imageClone = $('.image-template').clone();
  // Append cloned element to main
  $('main').append($imageClone);
  // Get h2, Set title
  $imageClone.find('h2').text(this.title);
  // Get img, Set src
  $imageClone.find('img').attr('src', this.url);
  // Get img, Set alt
  $imageClone.find('img').attr('alt', this.title);
  // Get p, Set description
  $imageClone.find('p').text(this.description);
  // Remove class attribute
  $imageClone.removeClass('image-template');
  // Set class using keyword
  $imageClone.attr('class', this.keyword);
};


// Read the json file, renders image, adds unqiue keywords to arr, appends to drop down menu
Image.readJson = () => {
  $.ajax('../data/page-1.json')
    .then(data => {
      data.forEach(item => {
        let image = new Image(item);
        checkIfUnique(image.keyword);
        image.render();
      });
      populateDropDownMenu();
    });
};

$(() => Image.readJson());


// Event listener to drop down menu
$('#dropItems').click(filterImages);

// on click function that shows clicked classes and hides not clicked classes
function filterImages() {
  if ($(this).val() === 'default') {
    return;
  } else {
    for (let i = 0; i < dropDownArr.length; i++) {
      if (dropDownArr[i] !== $(this).val()) {
        $(`.${dropDownArr[i]}`).hide();
      } else {
        $(`.${dropDownArr[i]}`).show();
      }
    }
  }
}

// populates dropDownArr with unique keywords
function checkIfUnique(keyword) {
  for (let i = 0; i < dropDownArr.length; i++) {
    if (dropDownArr[i] === keyword) {
      return;
    }
  }
  dropDownArr.push(keyword);
}

// appends drop down menu with dropDownArr
function populateDropDownMenu() {
  dropDownArr.forEach( keyword => {
    $('#dropItems').append(`<option value="${keyword}">${keyword}</option>`);
  });
}


