let coursesJSON;

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

    populateCourses(coursesJSON.python);

}

function populateCourses(data) {
    const htmlString = data.map(course => {
        return `
        <div class="course ${course.id}">
            <div class="img-wrapper"><img src="${course.image}" alt="course image" width="220px" height="125px"/></div>
            <div class="course-content">
                <div class="inline-blck"><h3><a href="#" class="fnt-md">${course.title}</a></h3></div>
                <div class="fnt-xs">${course.author}</div>
                <div class="rate">${course.rating} <span class="stars">${stars(course.rating)}</span> <span class="fnt-xs">(${course.people})</span></div>
                <div class="price fnt-md">E£${course.price}</div>
            </div>
        </div>`;
    }).join('');
    document.querySelector('.courses').innerHTML = htmlString;
}

populate();

let input, courses, course, item, txtValue;
    input = document.getElementById("srch-input");
    courses = document.getElementsByClassName("courses");
    course = document.querySelectorAll(".course");
    courseTitle = document.querySelectorAll(".course h3");

input.addEventListener('keyup', (e) =>{
    const searchString = e.target.value.toLowerCase();
    const filteredCourses = coursesJSON.python.filter(course => {
        return course.title.toLowerCase().includes(searchString);
    });
    populateCourses(filteredCourses);
});