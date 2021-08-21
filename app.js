// parse translateX value to number
function parseValue(value) {
    return Number(value.replace(/[^-?\d.]/g, ''));
}

// create sliders
function slider() {
    // set main width for tags container
    let tagsCtnMainWidth = () => {
        let tags = tagsCtn.querySelectorAll('.tag'), 
            tagsCtnWidth = 0,
            paddingLeft = window.getComputedStyle(tagsCtn).paddingLeft || 0,
            paddingRight = window.getComputedStyle(tagsCtn).paddingRight || 0;

        for (let tag of tags) {
            tagsCtnWidth += tag.getBoundingClientRect().width;
        }

        tagsCtn.style.width = `${tagsCtnWidth + parseValue(paddingLeft) + parseValue(paddingRight)}px`;
        return tagsCtn.getBoundingClientRect().width;
    }

    let tagsParCtn = document.querySelector('.tags-container'), tagsCtn = tagsParCtn.querySelector('.tags'), 
        nextBtn = tagsParCtn.querySelector('.next-btn'), prevBtn = tagsParCtn.querySelector('.prev-btn'), 
        tagsParCtnWidth = tagsParCtn.getBoundingClientRect().width, // get width of tags parent container  
        tagsCtnWidth = tagsCtnMainWidth(), // get width of tags container
        distance = -(tagsCtnWidth - tagsParCtnWidth), // get redundant part of the parent tags container compared to tag container
        isDown = false,
        isMove = false, // prevent continuous clicking on the slide
        startX, scrollLeft = 0, updateValue = 0;
     

    // hide or show buttons
    let hide = (el) => {
        el.style.display = 'none';
    }
    let show = (el) => {
        el.style.display = 'block';
    }

    // create drag slider
    let dragSlider = () => {
        tagsCtn.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - tagsCtn.offsetLeft;

            // the value will be updated 1 time per new drag  
            if (isMove) {
                updateValue += scrollLeft;
                isMove = false;
            }
        })

        tagsCtn.addEventListener('mouseup', () => {
            isDown = false;
        })

        tagsCtn.addEventListener('mouseleave', () => {
            isDown = false;
        })

        tagsCtn.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();

            isMove = true;
            const x = e.pageX - tagsCtn.offsetLeft;

            // handle when the user drags to the left
            if (x < startX || parseValue(tagsCtn.style.transform) < 0) {
                const walk = x - startX;
                scrollLeft = walk; // the value when dragged will be continuously updated

                tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;

                // handle when the user drags all the way to the left
                if (parseValue(tagsCtn.style.transform) <= distance) {
                    startX = x;
                    updateValue = distance; // the value will be updated to maximum

                    tagsCtn.style.transform = `translateX(${distance}px)`;
                }

                show(prevBtn);

                if (Math.ceil(parseValue(tagsCtn.style.transform)) <= Math.ceil(distance)) {
                    hide(nextBtn);
                } else {
                    show(nextBtn);
                }
            }
            // handle when the user drags all the way to the right
            else if (x > startX) {
                startX = x;
                updateValue = 0; // the value will be updated to its original state
                scrollLeft = 0; // the value will be updated to its original state
                tagsCtn.style.transform = `translateX(0px)`;

                hide(prevBtn);
            }
        })
    }

    dragSlider();

    // create click slider
    let clickSlider = () => {
        let tagsParCtnWidth = tagsParCtn.getBoundingClientRect().width; // get width of tags parent container
        let tagsCtnWidth = tagsCtn.getBoundingClientRect().width; // get width of tags container

        let distance = tagsCtnWidth - tagsParCtnWidth; // get redundant part of the parent tags container compared to tag container

        prevBtn.style.display = 'none';

        nextBtn.addEventListener('click', () => {
            tagsCtn.style.transform = `translateX(${parseValue(tagsCtn.style.transform) - 50}px)`;

            if (parseValue(tagsCtn.style.transform) <= -distance) {
                tagsCtn.style.transform = `translateX(-${distance}px)`;
                hide(nextBtn);
            }

            updateValue = parseValue(tagsCtn.style.transform);
            scrollLeft = 0;
            show(prevBtn);
        })

        prevBtn.addEventListener('click', () => {
            tagsCtn.style.transform = `translateX(${parseValue(tagsCtn.style.transform) + 50}px)`;

            if (parseValue(tagsCtn.style.transform) >= 0) {
                tagsCtn.style.transform = `translateX(0px)`;
                hide(prevBtn);
            }

            updateValue = parseValue(tagsCtn.style.transform);
            scrollLeft = 0;
            show(nextBtn);
        })
    }

    clickSlider();


    function moveSidebar() {
        let menuBtn = document.querySelector('.header-menu-btn'), // get element of menu button
            largeSidebar = document.querySelector('.sidebar-large'), // get element of large sidebar
            smallSidebar = document.querySelector('.sidebar-small'), // get element of small sidebar
            cardsCtn = document.querySelector('.cards'); // get element of cards container


        menuBtn.addEventListener('click', () => {
            largeSidebar.classList.toggle('closed');
            smallSidebar.classList.toggle('closed');
            tagsParCtn.classList.toggle('tags-container-small');
            cardsCtn.classList.toggle('cards-small');

            let tagsParCtnWidth = tagsParCtn.getBoundingClientRect().width, // get width of tags parent container  
                tagsCtnWidth = tagsCtnMainWidth(), // get width of tags container
                distance = -(tagsCtnWidth - tagsParCtnWidth); // get redundant part of the parent tags container compared to tag container

            if (Math.ceil(parseValue(tagsCtn.style.transform)) <= Math.ceil(distance)) {
                hide(nextBtn);
            } else {
                show(nextBtn);
            }
        })
    }

    moveSidebar();
}

slider();

// render cards
function renderCards() {
    const cardsInfo = [
        {
            title: 'Làm sao để cải thiện UI/UX cho Developer ?',
            thumb: '1',
            avatar: '1',
            userName: 'Evondev',
            views: '12.3k',
            time: '2 days',
            duration: '04:02'
        },
        {
            title: 'Tháng Tư Là Lời Nối Dối Của Em [Official Lyric Video] - Hà Anh Tuấn',
            thumb: '2',
            avatar: '2',
            userName: 'Hà Anh Tuấn',
            views: '155M',
            time: '5 years',
            duration: '5:03'
        },
        {
            title: 'YouTube Create Awesome Web Designs | Layout Design Tutorial',
            thumb: '3',
            avatar: '3',
            userName: 'Layout Design',
            views: '31.2K',
            time: '1 months',
            duration: '31:42'
        },
        {
            title: '3107 3 - W/n x ( Nâu,Duongg,Titie )| OFFICIAL MV',
            thumb: '4',
            avatar: '4',
            userName: 'W/n',
            views: '16.2M',
            time: '2 months',
            duration: '3:12'
        },
        {
            title: 'freeCodeCamp Give your CSS superpowers by learning Sass',
            thumb: '5',
            avatar: '5',
            userName: 'freeCodeCamp',
            views: '9.9M',
            time: '39 minutes',
            duration: '13:30'
        },
        {
            title: 'SƠN TÙNG M-TP | MUỘN RỒI MÀ SAO CÒN | OFFICIAL MUSIC VIDEO',
            thumb: '6',
            avatar: '6',
            userName: 'SƠN TÙNG M-TP',
            views: '112M',
            time: '1 years',
            duration: '3:54'
        },
        {
            title: 'Jack | Hoa Hải Đường | Official Music Video',
            thumb: '7',
            avatar: '7',
            userName: 'J97',
            views: '12',
            time: '3 weeks',
            duration: '4:55'
        },
        {
            title: 'F8 - Học lập trình để đi làm!',
            thumb: '8',
            avatar: '2',
            userName: 'F8 Officials',
            views: '10.3k',
            time: '29 days',
            duration: '4:19'
        },
        {
            title: '最佳声音背景音乐- 無廣告讀書音樂 作業用BGM☕閱讀和學習音樂,睡眠音樂,集中的音樂,集中的音樂,鋼琴純音樂,放鬆音樂,治療音樂Music for Concentration,Rain Sound',
            thumb: '9',
            avatar: '5',
            userName: 'Relaxing Music',
            views: '12M',
            time: '2 years',
            duration: '2:10:01'
        },
        {
            title: 'Đen - Trốn Tìm ft. MTV band (M/V)',
            thumb: '10',
            avatar: '3',
            userName: 'Đen Vâu Official',
            views: '72M',
            time: '8 months',
            duration: '5:32'
        },
        {
            title: 'Hướng dẫn cắt psd sang HTML CSS toàn tập với Zulu LandingPage',
            thumb: '11',
            avatar: '4',
            userName: 'evondev',
            views: '101K',
            time: '2 months',
            duration: '27:12'
        },
        {
            title: 'YouTube I Opened A Restaurant That Pays You To Eat At It',
            thumb: '12',
            avatar: '6',
            userName: 'Eat',
            views: '39M',
            time: '2 years',
            duration: '1:03:54'
        },
        {
            title: 'QUÂN A.P - BÔNG HOA ĐẸP NHẤT [OFFICIAL LYRICS VIDEO]',
            thumb: '13',
            avatar: '7',
            userName: 'QUÂN A.P',
            views: '36M',
            time: '9 month',
            duration: '4:18'
        },
       
    ] // save cards info

    let cardsCtn = document.querySelector('.cards'); 
    let cards = '';

    for (let cardInfo of cardsInfo) {
        cards += `
        <div class="card">
            <a href="#" class="card-link">
                <div class="card-thumbnail">
                    <img src="img/thumb-${cardInfo.thumb}.png" alt="">
                    <div class="card-times">${cardInfo.duration}</div>
                </div>

                <div class="card-content">
                    <div class="card-avatar">
                        <img src="img/user-${cardInfo.avatar}.png" alt="">
                    </div>

                    <div class="card-description">
                        <h3 class="card-title">${cardInfo.title}</h3>
                        <div class="card-user">
                            <span class="card-user__name">${cardInfo.userName}</span>
                            <span class="card-user__verified">
                                <i class='bx bxs-check-circle'></i>
                            </span>
                        </div>

                        <div class="card-info">
                            <span class="card-views">${cardInfo.views} views</span>
                            <span class="card-date">${cardInfo.time} ago</span>
                        </div>

                        <div class="card-options">
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `
    }

    cardsCtn.innerHTML = cards;
}

renderCards();

// handle button affect when clicking
function btnAffect() {
    let btns = document.querySelectorAll('.btn-active'); // get element of active buttons

    for (let btn of btns) {
        btn.addEventListener('mousedown', () => {
            btn.classList.add('btn-down');
            btn.classList.remove('btn-up');
        })

        btn.addEventListener('mouseup', () => {
            btn.classList.remove('btn-down');
            btn.classList.add('btn-up');
        })
    }
}

btnAffect();


// create dark mode button
function darkMode() {
    const toggleSwitch = document.querySelector('.toggle input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {            
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {            
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

darkMode();
