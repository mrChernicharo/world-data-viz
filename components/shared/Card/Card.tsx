import { ReactChildren } from 'react';
import { CardContainer } from './CardContainer';

interface ICardProps {
	children: any;
}

export default function Card({ children }: ICardProps) {
	return <CardContainer>{children}</CardContainer>;
}
