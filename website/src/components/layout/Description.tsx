import { Markdown } from 'Components/utility/Markdown';
import React from 'react';

interface DescriptionProps {
  text: string;
}

export const Description: React.FC<DescriptionProps> = ({ text }) => {
  return <Markdown text={text} />;
};
