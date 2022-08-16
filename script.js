let numOfCourses = 0;
let coursesJSON = null;

function stars(rating) {
    let result = [];
    for(let i = 1; i <= 5; i++) {
        if(i <= rating) {
            result.push('<i class="fa-solid fa-star"></i>');
        } else if(i - 0.5 <= rating) {
            result.push('<i class="fa-solid fa-star-half-stroke"></i>');
        }
        else {result.push(('<i class="fa-regular fa-star"></i>'))};
    }
    return result.join('');
}

async function populate() {

    const requestURL = 'https://mocki.io/v1/267219ae-212b-4870-a201-d5b671b8e35e';
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    coursesJSON = await response.json();

    numOfCourses = coursesJSON.python.length;
    populateCourses(coursesJSON);

}

function populateCourses(data) {
    const courses = document.querySelector('.courses');
    for(const i of data.python) {
        let course = document.createElement("div");
        let cName = "course " + i.id;
        course.className = cName;
        course.innerHTML = `
        <div class="img-wrapper"><img src="${i.image}" alt="course image" width="220px" height="125px"/></div>
        <div class="course-content">
            <div class="inline-blck"><h3><a href="#" class="fnt-md">${i.title}</a></h3></div>
            <div class="fnt-xs">${i.author}</div>
            <div class="rate">${i.rating} <span class="stars">${stars(i.rating)}</span> <span class="fnt-xs">(${i.people})</span></div>
            <div class="price fnt-md">E£${i.price}</div>
        </div>`
    courses.appendChild(course);
    }
    numOfCourses = coursesJSON.python.length;
}

  populate();


const search = () => {
    let input, filter, courses, course, item, txtValue;
    input = document.getElementById("srch-input");
    filter = input.value.toUpperCase();
    courses = document.getElementsByClassName("courses");
    course = document.querySelectorAll(".course");
    courseTitle = document.querySelectorAll(".course h3");
    for(let i = 0; i < course.length; i++) {
        item = courseTitle[i];
        txtValue = item.textContent || item.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            course[i].style.display = "";
        } else {
            course[i].style.display = "none";
        }
    }
}