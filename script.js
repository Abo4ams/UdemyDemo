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

    fetch(`https://udemy-json-server.herokuapp.com/allTopics`)
    .then((response) => response.json())
    .then((json) => console.log(json));
    
}

async function populate(topic) {

    fetch(`https://udemy-json-server.herokuapp.com/allTopics/${topic}`)
    .then((response) => response.json())
    .then((json) => populateCourses(json));
    
}

function populateCourses(data) {
    data = data[0];
    const htmlCourseString = data.courses.map((course, index) => {
        return index == 0 ? `<div class="carousel-item active course ${course.id}">
                    <div class="img-wrapper"><img src="${course.image}" alt="course image" width="220px" height="125px"/></div>
                    <div class="course-content">
                        <div class="inline-blck"><h4><a href="#" class="fnt-md">${course.title}</a></h3></div>
                        <div class="fnt-xs mt-1">${course.instructors.map(instructor => `${instructor.name}`).join(', ')}</div>
                        <div class="rate">${parseFloat(course.rating).toFixed(1)} <span class="stars">${stars(parseFloat(course.rating).toFixed(1))}</div>
                        <div class="price fnt-md">E£${course.price}</div>
                    </div>
                </div>` :
                `<div class="carousel-item course ${course.id}">
                    <div class="img-wrapper"><img src="${course.image}" alt="course image" width="220px" height="125px"/></div>
                    <div class="course-content">
                        <div class="inline-blck"><h4><a href="#" class="fnt-md">${course.title}</a></h3></div>
                        <div class="fnt-xs">${course.instructors.map(instructor => `${instructor.name}`).join(', ')}</div>
                        <div class="rate">${course.rating} <span class="stars">${stars(course.rating)}</div>
                        <div class="price fnt-md">E£${course.price}</div>
                    </div>
                </div>`
                ;
    }).join('');

    const htmlString = `
        <div class="skills-banner">
            <div class="skills-banner-text">
                <h1 class="fnt-h-xl">${data.header}{course</h1>
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

// function populateCourses(data) {
//     const htmlString = data.map(course => {
//         return `
//         <div class="course ${course.id}">
//             <div class="img-wrapper"><img src="${course.image}" alt="course image" width="220px" height="125px"/></div>
//             <div class="course-content">
//                 <div class="inline-blck"><h3><a href="#" class="fnt-md">${course.title}</a></h3></div>
//                 <div class="fnt-xs">${course.author}</div>
//                 <div class="rate">${course.rating} <span class="stars">${stars(course.rating)}</span> <span class="fnt-xs">(${course.people})</span></div>
//                 <div class="price fnt-md">E£${course.price}</div>
//             </div>
//         </div>`;
//     }).join('');
//     document.querySelector('.courses').innerHTML = htmlString;
// }

populate("python");
populate();

let input = document.getElementById("srch-input");

input.addEventListener('keyup', (e) =>{
    const searchString = e.target.value.toLowerCase();
    const filteredCourses = coursesJSON.python.filter(course => {
        return course.title.toLowerCase().includes(searchString);
    });
    populateCourses(filteredCourses);
});