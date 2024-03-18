import './card.css'

type CardProp = {
  children: JSX.Element;
  bgColor?: string; 
  height?: string; 
  padding?: string;
}

function Card(props: CardProp) {
  return (
    <div className='card' style={
      { backgroundColor: props.bgColor,
        height: `${props.height}rem`,
        padding: `${props.height}rem`
      }}>
      {props.children}
    </div>
  )
}

export default Card