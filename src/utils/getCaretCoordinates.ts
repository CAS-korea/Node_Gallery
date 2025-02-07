export const getCaretCoordinates = (input: HTMLInputElement, position: number): { x: number; y: number } => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return { x: 0, y: 0 };

    // 입력 필드의 폰트 스타일을 가져와 canvas context에 설정합니다.
    const computedStyle = window.getComputedStyle(input);
    context.font = computedStyle.font;

    // caret 이전의 텍스트의 너비를 측정합니다.
    const textBeforeCaret = input.value.substring(0, position);
    const textWidth = context.measureText(textBeforeCaret).width;

    const rect = input.getBoundingClientRect();
    return {
        x: rect.left + textWidth,
        y: rect.top + rect.height / 2,
    };
};
