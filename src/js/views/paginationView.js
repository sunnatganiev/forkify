import View from './View.js';
import icons from '../../img/icons.svg'; // Parcel 1

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goto = +btn.dataset.goto;

      handler(goto);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._curPage === 1 && numPages > 1) {
      return this._renderNextBtn();
    }

    if (this._curPage === numPages && numPages > 1) {
      return this._renderPrevBtn();
    }

    if (this._curPage < numPages && this._curPage > 1) {
      return `
          ${this._renderPrevBtn()}
          ${this._renderNextBtn()}
      `;
    }

    return '';
  }

  _renderPrevBtn() {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto="${
      this._curPage - 1
    }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._curPage - 1}</span>
    </button>
  `;
  }

  _renderNextBtn() {
    return `
        <button class="btn--inline pagination__btn--next" data-goto="${
          this._curPage + 1
        }">
          <span>Page ${this._curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
  }
}

export default new PaginationView();
