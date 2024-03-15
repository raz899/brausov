function searchTable() {
    const trs = document.querySelectorAll('.active tbody tr:not(.header-table)');
    const filter = document.querySelector('.table-search').value;
    const regex = new RegExp(filter, 'i');

    function isFoundInTds(td) {
        return regex.test(td.innerHTML);
    }

    function isFound(childrenArr) {
        return childrenArr.some(isFoundInTds);
    }

    function setTrStyleDisplay({ style, children }) {
        style.display = isFound([
            ...children // <-- All columns
        ]) ? '' : 'none';
    }

    trs.forEach(setTrStyleDisplay);
};
// const triggerTabList = document.querySelectorAll('.nav-tabs button');
// triggerTabList.forEach(triggerEl => {
//     const tabTrigger = new bootstrap.Tab(triggerEl);
//     triggerEl.addEventListener('shown.bs.tab', event => {
//         event.preventDefault();
//         myFunction();
//         tabTrigger.show();
//         const idTabs = document.querySelector('nav button.nav-link.active').getAttribute('data-id');
        // window.location.search = `?tabs=${idTabs}`;
        // window.location.search.has = 'tabs';
        // if (window.location.search.has == 'tabs');
//     });
// });
// добавления по клику tr
const addButton = document.querySelector('.js-add-table-tr');
const tableTbody = document.querySelector('.js-table tbody');
if (addButton != null) {
    addButton.addEventListener('click', function () {
        const newRow = document.createElement('tr');
        newRow.innerHTML = '<td><div class="table-content"> <input class="form-control form-control-sm" type="text"></div></td><td style="min-width: 250px;"><div class="table-content"><select class="form-select form-select-sm" aria-label=""><option selected></option> <option value="1">Accelera</option><option value="2">Accelus</option> <option value="3">Advance</option> </select></div></td><td style="min-width: 250px;"><div class="table-content"> <select class="form-select form-select-sm" aria-label=""> <option selected></option> <option value="1">Badak X-Treme</option> <option value="2">PHI</option> <option value="3">PHI 2</option> </select></div></td><td><div class="table-content"> <input class="form-control form-control-sm" type="text"></div></td> <td><div class="table-content"><button class="btn btn-close js-btn-close" type ="button"></button></div></td>';
        tableTbody.appendChild(newRow);
    });
};
const table = document.querySelector('.js-table');
if (table != null) {
    table.addEventListener('click', function (e) {
        if (e.target.classList.contains('js-btn-close')) {
            e.target.closest('tr').remove();
        }
    });
};



