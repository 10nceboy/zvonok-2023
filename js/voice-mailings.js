function createRangeSlider(containerSelector, tickValues) {
  const container = document.querySelector(containerSelector);
  const rangeInput = container.querySelector('input[type="range"]');
  const valueLabel = container.querySelector(".value-label");
  const segmentLength = 100 / (tickValues.length - 1);

  function convertToRealValue(value) {
    const index = Math.floor(value);
    const fraction = value - index;

    if (index === tickValues.length - 1) {
      return tickValues[tickValues.length - 1];
    }

    const start = tickValues[index];
    const end = tickValues[index + 1];

    return start + (end - start) * fraction;
  }

  tickValues.forEach((value, i) => {
    const tickLabel = document.createElement("span");
    tickLabel.className = "mailings-calc-milestone color-light";
    tickLabel.textContent = value;
    tickLabel.style.left = `calc(${i * segmentLength + "%"} + 2px)`;
    tickLabel.style.transform = `translate(-${i * segmentLength}%)`;

    tickLabel.addEventListener("click", () => {
      rangeInput.value = i;
      updateValueLabel();
    });

    container.appendChild(tickLabel);
  });

  rangeInput.addEventListener("input", updateValueLabel);

  function calculateTotalPrice(quantity, duration) {
    const totalPriceSpan = document.querySelector(".mailings-calc-total");
    totalPriceSpan.innerHTML = `${parseFloat(
      quantity * 0.1 + duration * 0.32,
      10
    ).toFixed(1)}&nbsp;₽`.replace(/\.0([^\d])/g, "$1");
  }

  function updateValueLabel() {
    const realValue = convertToRealValue(parseFloat(rangeInput.value));
    valueLabel.textContent = Math.round(realValue);
    valueLabel.style.left = parseFloat(rangeInput.value) * segmentLength + "%";
    valueLabel.style.transform = `translate(-${
      parseFloat(rangeInput.value) * segmentLength
    }%)`;

    const quantity = document.querySelector(
      ".mailings-calc-quantity-value"
    ).textContent;
    const duration = document.querySelector(
      ".mailings-calc-duration-value"
    ).textContent;

    calculateTotalPrice(quantity, duration);
  }

  updateValueLabel();
}

createRangeSlider(
  ".mailings-calc-range-container-quantity",
  [1, 100, 500, 1000, 1500, 2000]
);
createRangeSlider(
  ".mailings-calc-range-container-duration",
  [10, 30, 60, 120, 240, 360]
);
