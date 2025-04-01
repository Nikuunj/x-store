
import { atomFamily, RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';

const elementPositionStateFamily = atomFamily({
  key: 'ElementPosition',
  default: ()=> [0],
});


function App() {
  return (
    <>
    <RecoilRoot>
      <Render elementID={0} key={0}/>
    </RecoilRoot>
    </>
  )
}

function Render({ elementID }) {
  return <>
  <br />
    <ElementList elementID={elementID}/>
    <Btn elementID={elementID}/>
    <br />
   </>
}
function ElementList({ elementID }) {
  const position = useRecoilValue(elementPositionStateFamily(elementID));
  return (
    <div>
      Element: {elementID}
      <br />
      Position: {position.toString()}
      
    </div>
    )
}

function Btn( {elementID} ){
  const setVal = useSetRecoilState(elementPositionStateFamily(elementID))
  return  <>
    <div onClick={() => setVal(pre => [...pre, pre[pre.length - 1] + 1])}>click me</div>
    <div onClick={() => setVal([0])}>clear me</div>
  </>
}

export default App
