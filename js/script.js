function startMap() {
    const map = L.map("page-map", {
        // dragging: false,
        // zoomControl: false,
        // scrollWheelZoom: false,
        tap: !L.Browser.mobile,
    }).setView([51.505, -0.09], 3);

    L.tileLayer("//{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    let addresses = [
        {
            lat: 10.10,
            lng: 20.20,
            link: 'ultramaining.com',
            count: 4,
        },
        {
            lat: 30.10,
            lng: 5.30,
            link: 'ultramaining.com',
            count: 4,
        }
    ]

    const markers = [];

    Object.keys(addresses).map(function (key, index) {
        let address = addresses[key],
            marker = new L.marker(L.latLng(address.lat, address.lng), {
                icon: new L.DivIcon({
                    className: "",
                    html: `<div class="data-card">
                                <div class="data-card__item active">
                                    <div class="data-card__img">
                                        <img src="../img/andre/popup-map.jpg" alt="card" onclick="window.location='${address.link}'">
                                        <div class="check-group">
                                            <div class="card-wrapper-checkbox">
                                                <input type="checkbox" id="xxxxxxx" value="Russia">
                                                <label for="xxxxxxx"></label>
                                            </div>
                                        </div>
                                        <div class="card-wrapper-group">
                                            <div class="card-wrapper-title">
                                                <div>MYRIG</div>
                                                <div class="checked"></div>
                                            </div>
                                        </div>
                                        <button class="lightning">
                                            <div></div>
                                        </button>
                                    </div>
                                    <div class="data-card__content">
                                        <div class="data-card__group--content">
                                            <div class="data-card__content--price">
                                                <div>Price</div>
                                                <div>
                                                    <div>0.039$</div>
                                                    <div>kW/h</div>
                                                </div>
                                            </div>
                                            <div class="data-card__content--power m0">
                                                <div>Power Capacity</div>
                                                <div>
                                                    <div>180</div>
                                                    <div>MW</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>`,
                }),
            }).addTo(map);

        markers.push(marker);
    });

    let group = new L.featureGroup(markers);

    let paddingMap = [0, 200];

    if (markers.length == 1) paddingMap = [-300, 200];

    if (window.matchMedia("(max-width: 1199px)").matches) {
        paddingMap = [0, 350];
    }

    map.fitBounds(group.getBounds(), {
        paddingTopLeft: paddingMap,
    });
};
//CHANGES BUTTONS ADD OR REMOVE CARDS/MAP

const buttonGrid = document.querySelectorAll('.data-centers__but > button');

if (buttonGrid) {
    let click = 0;
    const block = document.querySelector('.data-card');
    const blockLeft = document.querySelector('.data-card > :nth-child(1)');
    const blockRight = document.querySelector('.data-card > :nth-child(2)');
    const card = document.querySelector('.data-card__block');
    const cards = document.querySelectorAll('.data-card__item');
    const map = document.querySelector('.data-map');
    const showMap = document.querySelector('.showMap');
    const showList = document.querySelector('.showList');
    const find = document.querySelector('.data-centers__find');
    const add = document.querySelector('.data-centers__add');
    const expand = document.querySelector('.data-centers__expand');
    const expandClose = document.querySelector('.data-centers__expand.active');
    const wrapper = document.querySelector('.data-centers__wrapper');


    window.addEventListener('DOMContentLoaded', function () {
        buttonGrid[0].addEventListener('click', addMap);
        buttonGrid[1].addEventListener('click', removeMap);
        removeMap();
        showMap.addEventListener('click', function () {
            addMap();
            showList.classList.add('active');
            showMap.classList.remove('active');
            blockLeft.classList.remove('active');
            blockLeft.classList.add('hidden');
            blockRight.classList.add('active');
            activeAddFind();

        });
        showList.addEventListener('click', function () {
            removeMap();
            showList.classList.remove('active');
            showMap.classList.add('active');
            blockRight.classList.remove('active');
            blockLeft.classList.add('active');
            blockLeft.classList.remove('hidden');
        });

        let cl = 0;
        expand.addEventListener('click', function () {
            block.classList.remove('active');
            blockLeft.classList.remove('active');
            blockLeft.classList.toggle('hidden');
            find.classList.toggle('changeLoc');
            add.classList.toggle('changeLoc');

            if (cl >= 1 & cl < 2) {
                block.classList.add('active');
                blockLeft.classList.add('active');
                blockLeft.classList.remove('hidden');

            } else if (cl >= 2) {
                block.classList.remove('active');
                cl = 0;
            }
            cl++;
        });
    });

    // ПРИ СМЕНЕ РАЗМЕРА ЭКРАНА ПЕРЕРИСОВЫВАТЬ КАРТУ И АКТИВНЫЕ БЛОКИ
    // window.addEventListener('resize', function () {
    //     removeMap();
    //     block.classList.remove('active');
    //     // card.classList.remove('active');
    //     addMap();
    // });

    function addMap() {
        buttonGrid[0].classList.remove('active');
        buttonGrid[1].classList.add('active');
        block.classList.add('active');
        blockLeft.classList.add('active');
        blockRight.classList.add('active');
        expand.classList.add('active');
        // card.classList.add('active');
        activeAddFind();
        if (window.screen.width < 800) {
            blockLeft.classList.add('hidden');
            blockLeft.classList.remove('active');
        }
        removeActiveCard();
        if (click < 1) {
            startMap();
        }
        click++;

        if (window.screen.width > 1320) {
            for (let i = 0; i < 3; i++) {
                cards[i].classList.add('active');
            }
        } else if (window.screen.width <= 1320 && window.screen.width > 768) {
            for (let i = 0; i < 2; i++) {
                cards[i].classList.add('active');
            }
        } else if (window.screen.width <= 768) {
            for (let i = 0; i < 1; i++) {
                cards[i].classList.add('active');
            }
        } else {
            console.log("Add Map");
        }
    }

    function removeMap() {
        buttonGrid[0].classList.add('active');
        buttonGrid[1].classList.remove('active');
        block.classList.remove('active');
        expand.classList.remove('active');
        blockLeft.classList.remove('active');
        blockRight.classList.remove('active');
        removeActiveCard();
        blockLeft.classList.remove('hidden');
        if (window.screen.width <= 800) {

            blockLeft.classList.add('active');
            card.classList.remove('active');
        }
        removeAddFind();


        if (window.screen.width > 1200) {
            for (let i = 0; i < 5; i++) {
                cards[i].classList.add('active');
            }
        } else if (window.screen.width <= 1200 && window.screen.width > 991) {
            for (let i = 0; i < 4; i++) {
                cards[i].classList.add('active');
            }
        } else if (window.screen.width <= 991 && window.screen.width > 768) {
            for (let i = 0; i < 3; i++) {
                cards[i].classList.add('active');
            }
        } else if (window.screen.width <= 768 && window.screen.width > 584) {
            for (let i = 0; i < 2; i++) {
                cards[i].classList.add('active');
            }
        } else if (window.screen.width <= 584) {
            for (let i = 0; i < 1; i++) {
                cards[i].classList.add('active');
            }
        } else {
            console.log("Remove Map");
        }
    }

    function removeActiveCard() {
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active');
        }
    }

    function activeAddFind() {
        find.classList.add('active');
        add.classList.add('active');
        if (window.screen.width <= 375) {
            wrapper.classList.add('active');
        }
    }

    function removeAddFind() {
        find.classList.remove('active');
        add.classList.remove('active');
        if (window.screen.width <= 375) {
            wrapper.classList.remove('active');
        }
    }
};
const selects = document.querySelectorAll('.filter__block .filter__select');

if (selects) {
    const deafults = document.querySelectorAll('.data-centers__sort .filter__select');
    const deafultValue = document.querySelector('.defaultChanges');
    const selectValue = document.querySelector('.selectChanges');

    window.addEventListener('DOMContentLoaded', function () {
        select(selects, selectValue);
        select(deafults, deafultValue);

        function select(array, value) {
            for (let i = 0; i < deafults.length; i++) {
                array[i].addEventListener('click', function (e) {
                    value.innerHTML = e.target.innerHTML;
                    value.dataset.val = array[i].dataset.val;
                });
            }
        }
    })
};
//CHANGES BUTTONS NAVIGATE AND ACTIVE CONTENTS
const buttonsNavigate = document.querySelectorAll('.filter__button > :nth-child(1)');

if (buttonsNavigate) {
    const sort = document.querySelector('.filter__default > :nth-child(1)');
    const sortContent = document.querySelector('.filter__default > :nth-child(2)');

    const addSelectActive = document.querySelectorAll('.add-select > :nth-child(1)');
    const addContent = document.querySelectorAll('.add-select > :nth-child(2)');

    const navigate = document.querySelector('.filter');
    const buttonsContent = document.querySelectorAll('.filter__button  > :nth-child(2)');
    const buttonsPrice = document.querySelectorAll('.filter__content > .buttonSelect');
    const buttonsPriceSpan = document.querySelectorAll('.filter__content > .buttonSelect > :nth-child(1)');

    const rangeValue = document.querySelectorAll('.myRange');
    const body = document.querySelector('body');

    const filter = document.querySelector('.data-centers__filter');
    const filterClose = document.querySelector('.filter__close');

    window.addEventListener('DOMContentLoaded', function () {
        for (let i = 0; i < buttonsNavigate.length; i++) {

            buttonsNavigate[i].addEventListener('click', function () {
                buttonsContent[i].classList.toggle('active');
                buttonsNavigate[i].classList.toggle('active');
                navigate.classList.add('active');
                body.addEventListener('click', function (e) {

                    if (window.screen.width >= 801) {
                        if (!e.target.closest('.filter__button')) {
                            navigate.classList.remove('active');
                            buttonsContent[i].classList.remove('active');
                            buttonsNavigate[i].classList.remove('active');
                        }
                    }
                });
            });
        }
        sort.addEventListener('click', function () {
            sort.classList.toggle('active');
            sortContent.classList.toggle('active');
            // console.log(sort);
            // sort.remove();
            body.addEventListener('click', function (e) {
                if (!e.target.closest('.filter__default')) {
                    sort.classList.remove('active');
                    sortContent.classList.remove('active');
                }
            });
        });

        for (let i = 0; i < addSelectActive.length; i++) {
            addSelectActive[i].addEventListener('click', function () {
                addSelectActive[i].classList.toggle('active');
                addContent[i].classList.toggle('active');
                body.addEventListener('click', function (e) {
                    if (!e.target.closest('.add-select')) {
                        addSelectActive[i].classList.remove('active');
                        addContent[i].classList.remove('active');
                    }
                });
            });
        }

        filter.addEventListener('click', function () {
            navigate.classList.add('active');
        });
        filterClose.addEventListener('click', function () {
            navigate.classList.remove('active');
        });

        for (let i = 0; i < buttonsPrice.length; i++) {
            rangeValue[i].addEventListener("change", function () {
                buttonsPriceSpan[i].innerHTML = `0 — ${rangeValue[i].value}`;
                buttonsPrice[i].addEventListener('click', function () {
                    localStorage.setItem(`range_${i}`, rangeValue[i].value);
                });
            });
        }
    });

    function addClass() {
        navigate.classList.add('active');
    }

    function removeClass() {
        navigate.classList.remove('active');
    }
};
function startMap() {
    const map = L.map("page-map", {
        // dragging: false,
        // zoomControl: false,
        // scrollWheelZoom: false,
        tap: !L.Browser.mobile,
    }).setView([51.505, -0.09], 3);

    L.tileLayer("//{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    let addresses = [
        {
            lat: 10.10,
            lng: 20.20,
            link: 'ultramaining.com',
            count: 4,
        },
        {
            lat: 30.10,
            lng: 5.30,
            link: 'ultramaining.com',
            count: 4,
        }
    ]

    const markers = [];

    Object.keys(addresses).map(function (key, index) {
        let address = addresses[key],
            marker = new L.marker(L.latLng(address.lat, address.lng), {
                icon: new L.DivIcon({
                    className: "",
                    html: `<div class="data-card">
                                <div class="data-card__item active">
                                    <div class="data-card__img">
                                        <img src="../img/andre/popup-map.jpg" alt="card" onclick="window.location='${address.link}'">
                                        <div class="check-group">
                                            <div class="card-wrapper-checkbox">
                                                <input type="checkbox" id="xxxxxxx" value="Russia">
                                                <label for="xxxxxxx"></label>
                                            </div>
                                        </div>
                                        <div class="card-wrapper-group">
                                            <div class="card-wrapper-title">
                                                <div>MYRIG</div>
                                                <div class="checked"></div>
                                            </div>
                                        </div>
                                        <button class="lightning">
                                            <div></div>
                                        </button>
                                    </div>
                                    <div class="data-card__content">
                                        <div class="data-card__group--content">
                                            <div class="data-card__content--price">
                                                <div>Price</div>
                                                <div>
                                                    <div>0.039$</div>
                                                    <div>kW/h</div>
                                                </div>
                                            </div>
                                            <div class="data-card__content--power m0">
                                                <div>Power Capacity</div>
                                                <div>
                                                    <div>180</div>
                                                    <div>MW</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>`,
                }),
            }).addTo(map);

        markers.push(marker);
    });

    let group = new L.featureGroup(markers);

    let paddingMap = [0, 200];

    if (markers.length == 1) paddingMap = [-300, 200];

    if (window.matchMedia("(max-width: 1199px)").matches) {
        paddingMap = [0, 350];
    }

    map.fitBounds(group.getBounds(), {
        paddingTopLeft: paddingMap,
    });
};
const compare = document.querySelector('.data-compare');

if (compare) {
    const checkboxItem = document.querySelectorAll(".check-group input[type='checkbox']");
    const content = document.querySelector("#content");
    const clear = document.querySelector(".data-compare__clear");

    const modalActive = document.querySelector("#data-modal-compare");
    const buttonModalActive = document.querySelector(".data-compare__button > button");
    const buttonModalClose = document.querySelector("#data-modal-compare .b-theme-modal__close");

    const findActive = document.querySelector("#data-modal-form");
    const findModalClose = document.querySelector("#data-modal-form .b-theme-modal__close");
    const findModalActive = document.querySelector(".data-centers__find");

    const addActive = document.querySelector("#data-modal-add");
    const addModalClose = document.querySelector("#data-modal-add .b-theme-modal__close");
    const addModalActive = document.querySelector(".data-centers__add");

    window.addEventListener('DOMContentLoaded', function () {
        for (let i = 0; i < checkboxItem.length; i++) {
            checkboxItem[i].addEventListener('click', function () {
                compareActive();
                clear.addEventListener('click', clearAllCompare)
                console.log(checkboxItem[i]);
            });
        }

        openAndCloseModal(buttonModalActive, buttonModalClose, modalActive, requestActiveForm());
        openAndCloseModal(findModalActive, findModalClose, findActive);
        openAndCloseModal(addModalActive, addModalClose, addActive);

        function openAndCloseModal(open, close, active, func) {
            open.addEventListener('click', function () {
                active.classList.add('show');
                active.style.display = 'block';
            })
            close.addEventListener('click', function () {
                active.classList.remove('show');
                active.style.display = 'none';
            })
            func ? func() : false;
        }

    });


    function compareActive() {
        compare.classList.add('active');
        content.style.paddingBottom = '0px';
    }

    function clearAllCompare() {
        compare.classList.remove('active');
        content.style.paddingBottom = '60px';
    }

    function requestActiveForm() {
        const requestActive = document.querySelector("#data-modal-request");
        const requestModalClose = document.querySelector("#data-modal-request .b-theme-modal__close");
        const requestModalActive = document.querySelectorAll(".buttons-compare > button");


        for (let i = 0; i < requestModalActive.length; i++) {
            requestModalActive[i].addEventListener('click', function () {
                requestActive.classList.add('show');
                requestActive.style.display = 'block';
            });
        }

        requestModalClose.addEventListener('click', function () {
            requestActive.classList.remove('show');
            requestActive.style.display = 'none';
        });
    }
};

// Функция добавления название имени файла к загрузке изображения в карточку дата центра
function getFileName() {
    var file = document.getElementById('uploaded-file').value;
    file = file.replace(/\\/g, '/').split('/').pop();
    document.getElementById('file-name').innerHTML = file;
}