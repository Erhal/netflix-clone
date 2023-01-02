const truncate = (text: string, numberOfLetters: number): string => {
  return text?.length > numberOfLetters
    ? `${text.substring(0, numberOfLetters - 1)}...`
    : text;
};

export default truncate