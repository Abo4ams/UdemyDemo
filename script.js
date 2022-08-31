let coursesJSON;

let allTopics = ["python", "excel","web", "js", "ds", "aws", "drawing"];

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


const populate = async (topic) => {
    const response = await fetch(`https://udemy-json-server.herokuapp.com/allTopics/`);
    const data = await response.json();
    coursesJSON = data;
    populateCourses(data, topic);
    return data;
}

function populateCourses(data, topic) {
    coursesJSON = data;
    data = data[topic];
    const htmlCourseString = data.courses.map((course, index) => {
        return index == 0 ? `<div class="carousel-item active col-md-3 course ${course.id}">
                    <div class="img-wrapper"><img src="${course.image}" alt="course image" width="255.2px" height="145px"/></div>
                    <div class="course-content">
                        <div class="inline-blck"><h4><a href="#" class="fnt-md">${course.title}</a></h3></div>
                        <div class="fnt-xs mt-1">${course.instructors.map(instructor => `${instructor.name}`).join(', ')}</div>
                        <div class="rate">${parseFloat(course.rating).toFixed(1)} <span class="stars">${stars(parseFloat(course.rating).toFixed(1))}</div>
                        <div class="price fnt-md">E£${course.price}</div>
                    </div>
                </div>` :
                `<div class="carousel-item col-md-3 course ${course.id}">
                    <div class="img-wrapper"><img src="${course.image}" alt="course image" width="255.2px" height="145px"/></div>
                    <div class="course-content">
                        <div class="inline-blck"><h4><a href="#" class="fnt-md">${course.title}</a></h3></div>
                        <div class="fnt-xs">${course.instructors.map(instructor => `${instructor.name}`).join(', ')}</div>
                        <div class="rate">${parseFloat(course.rating).toFixed(1)} <span class="stars">${stars(parseFloat(course.rating).toFixed(1))}</div>
                        <div class="price fnt-md">E£${course.price}</div>
                    </div>
                </div>`
                ;
    }).join('');

    const htmlString = `
        <div class="skills-banner">
            <div class="skills-banner-text">
                <h1 class="fnt-h-xl">${data.header}</h1>
                <p class="fnt-p">${data.description}</p>
            </div>
            <a href="#"><span class="explore-btn fnt-btn">Explore Python</span></a>
        </div>

        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${htmlCourseString}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>
    `;
    document.querySelector('.skills-hub').innerHTML = htmlString;
}


function populateFilteredCourses(data) {
    const htmlString = data.map((courses, index) => {
        return courses.map((course, index2) => {
        return  index == 0 && index2 == 0 ? `<div class="carousel-item active col-md-3 course ${course.id}">
                    <div class="img-wrapper"><img src="${course.image}" alt="course image" width="255.2px" height="145px"/></div>
                    <div class="course-content">
                        <div class="inline-blck"><h4><a href="#" class="fnt-md">${course.title}</a></h3></div>
                        <div class="fnt-xs mt-1">${course.instructors.map(instructor => `${instructor.name}`).join(', ')}</div>
                        <div class="rate">${parseFloat(course.rating).toFixed(1)} <span class="stars">${stars(parseFloat(course.rating).toFixed(1))}</div>
                        <div class="price fnt-md">E£${course.price}</div>
                    </div>
                </div>` :
                `<div class="carousel-item col-md-3 course ${course.id}">
                    <div class="img-wrapper"><img src="${course.image}" alt="course image" width="255.2px" height="145px"/></div>
                    <div class="course-content">
                        <div class="inline-blck"><h4><a href="#" class="fnt-md">${course.title}</a></h3></div>
                        <div class="fnt-xs">${course.instructors.map(instructor => `${instructor.name}`).join(', ')}</div>
                        <div class="rate">${parseFloat(course.rating).toFixed(1)} <span class="stars">${stars(parseFloat(course.rating).toFixed(1))}</div>
                        <div class="price fnt-md">E£${course.price}</div>
                    </div>
                </div>`
}).join("")}).join("")
    document.querySelector('.carousel-inner').innerHTML = htmlString;
    let skills = document.querySelector('.skills-banner');
    skills.innerHTML = `<div class="skills-banner-text">
    <h1 class="fnt-h-xl">Showing the search results:</h1></div>`;
    skills.style = 'margin-bottom: 0'

}

(async () => await populate("python"))();

allTopics.forEach(topic =>{
    const click = document.getElementById(topic) ; 
    click.addEventListener("click" , () => populateCourses(coursesJSON, topic))})


let input = document.getElementById("srch-input");

input.addEventListener('keyup', (e) =>{
    const searchString = e.target.value.toLowerCase();
    let filteredCourses = [];
    for(let i = 0; i < allTopics.length; i++){
        let curr = coursesJSON[allTopics[i]].courses;
        filteredCourses.push(Object.values(curr.filter(course => course.title.toLowerCase().includes(searchString))));
    }
    populateFilteredCourses(filteredCourses);
});

const myCarouselElement = document.querySelector('#myCarousel')
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  wrap: false
})
