import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

function createButton(label, direction) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'doc-pager__button';
  button.dataset.direction = direction;
  button.textContent = label;
  return button;
}

function enhanceDocPager() {
  const markdown = document.querySelector('article .theme-doc-markdown');
  if (!markdown || markdown.dataset.paged === 'true') {
    return undefined;
  }

  const contentNodes = Array.from(markdown.children);
  const hasSections = contentNodes.some((node) => node.tagName === 'H2');
  if (!hasSections) {
    return undefined;
  }

  const slides = [];
  let currentSlide = document.createElement('section');
  currentSlide.className = 'doc-pager__slide';

  contentNodes.forEach((node) => {
    if (node.tagName === 'H2' && currentSlide.childNodes.length > 0) {
      slides.push(currentSlide);
      currentSlide = document.createElement('section');
      currentSlide.className = 'doc-pager__slide';
    }
    currentSlide.appendChild(node);
  });

  if (currentSlide.childNodes.length > 0) {
    slides.push(currentSlide);
  }

  if (slides.length < 2) {
    slides.forEach((slide) => {
      while (slide.firstChild) {
        markdown.appendChild(slide.firstChild);
      }
    });
    return undefined;
  }

  markdown.dataset.paged = 'true';

  const controls = document.createElement('div');
  controls.className = 'doc-pager__controls';

  const previousButton = createButton('上一屏', 'previous');
  const nextButton = createButton('下一屏', 'next');
  const counter = document.createElement('span');
  counter.className = 'doc-pager__counter';

  controls.append(previousButton, counter, nextButton);

  const viewport = document.createElement('div');
  viewport.className = 'doc-pager__viewport';

  const track = document.createElement('div');
  track.className = 'doc-pager__track';
  slides.forEach((slide) => track.appendChild(slide));
  viewport.appendChild(track);

  markdown.replaceChildren(controls, viewport);

  let index = 0;

  function updatePager() {
    track.style.transform = `translateX(-${index * 100}%)`;
    counter.textContent = `${index + 1} / ${slides.length}`;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === slides.length - 1;
  }

  function goTo(nextIndex) {
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));
    updatePager();
  }

  function handleClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    if (target.dataset.direction === 'previous') {
      goTo(index - 1);
    }

    if (target.dataset.direction === 'next') {
      goTo(index + 1);
    }
  }

  function handleKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    if (event.key === 'ArrowLeft') {
      goTo(index - 1);
    }
    if (event.key === 'ArrowRight') {
      goTo(index + 1);
    }
  }

  controls.addEventListener('click', handleClick);
  window.addEventListener('keydown', handleKeydown);
  updatePager();

  return () => {
    controls.removeEventListener('click', handleClick);
    window.removeEventListener('keydown', handleKeydown);
  };
}

export default function Root({children}) {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('/docs/')) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(enhanceDocPager);
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname]);

  return <>{children}</>;
}
