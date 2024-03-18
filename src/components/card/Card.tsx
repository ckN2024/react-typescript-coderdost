import { ThemeContext } from '../../context/theme/theme';
import { useContext } from 'react';
import './card.css'

type CardProp = {
  children: JSX.Element;
  bgColor?: string; 
  height?: string; 
  padding?: string;
}

function Card(props: CardProp) {
  const theme = useContext(ThemeContext)
  return (
    <div className={`card ${theme}`} style={
      { backgroundColor: props.bgColor,
        height: `${props.height}rem`,
        padding: `${props.height}rem`
      }}>
      {props.children}
    </div>
  )
}

export default Card