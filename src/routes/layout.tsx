import Square from "../components/shapes/Square";
import Rectangle from "../components/shapes/Rectangle";
import AddButton from "../components/AddButton";
import { createEffect, createSignal, on, useContext } from "solid-js";
import { SwipeContext } from "~/components/AppLayout";

const boxPadding = "p-0.5";

export default function Layout() {
  const [orderList, setOrderList] = createSignal<number[]>([]);
  const {swipeDistance} = useContext(SwipeContext);

  const arrOfFive = [1,2,3,4,5];
  const arrOfTwo = [1,2];

  createEffect(
    on(
      swipeDistance,
      () => {
        // console.log("swipeDistance", swipeDistance());
        swipeDistance() > 0 ? setOrderList([]) : setRandomOrder();
      },
      {defer: true}
    )
  );
  // createEffect(() => {
  //   console.log("swipeDistance", swipeDistance());
  //   swipeDistance() >= 0 ? setOrderList([]) : setRandomOrder();
  // });

  function setRandomOrder(){
    const newOrderList: number[] = [];
    const nbRows = 6;

    function getRandomInt(max: number) {
      // from 1 to max
      return Math.floor((Math.random() * max) + 1);
    }

    while(newOrderList.length < nbRows){
      const randomInt = getRandomInt(nbRows);
      if(!newOrderList.includes(randomInt)){
        newOrderList.push(randomInt);
      }
    }
    setOrderList(newOrderList);
  }

  return (
    <>
      <section id="layout_section" class="flex flex-col w-full">
        {/* <button onClick={() => setRandomOrder()}>Randomize</button> */}

          <div id="row_0" class="flex flex-row w-full" style={orderList().length === 6 ? { order: orderList()[0]} : ""}>
            {
              arrOfFive.map((_item, index) => {
                return (
                  <Square innerClass={boxPadding} key={index} isRatioVisible={true}>
                    <AddButton hasBorder={true} >
                    </AddButton>
                  </Square>
                )
              })
            }
          </div>

          <div id="row_1" class="flex flex-row w-full" style={orderList().length === 6 ? { order: orderList()[1]} : ""}>
            <div class="w-4/5">
              <Rectangle innerClass={boxPadding} ratio={"1/4"} isRatioVisible={true}>
                <AddButton hasBorder={true}>
                </AddButton>
              </Rectangle>
            </div>

            <div class="w-1/5">
              <Square innerClass={boxPadding} isRatioVisible={true}>
                <AddButton hasBorder={true}>
                </AddButton>
              </Square> 
            </div>
          </div>

          <div id="row_2" class="flex flex-row w-full" style={orderList().length === 6 ? { order: orderList()[2]} : ""}>
            <div class="w-2/5">
              <Square innerClass={boxPadding} isRatioVisible={true}>
                <AddButton hasBorder={true}>
                </AddButton>
              </Square> 
            </div>

            <div class="w-3/5">
              <Rectangle innerClass={boxPadding} ratio={"2/3"} isRatioVisible={true}>
                <AddButton hasBorder={true}>
                </AddButton>
              </Rectangle>
            </div>
          </div>

          <div id="row_3" class="flex flex-row w-full" style={orderList().length === 6 ? { order: orderList()[3]} : ""}>
            {/* left col */}
            <div class="flex flex-col w-3/5">
              {/* upper row */}
              <div class="flex flex-row">
                <div class="flex flex-col w-1/3">
                  {
                    arrOfTwo.map((item, index) => {
                      return (
                        <Square innerClass={boxPadding} key={index} isRatioVisible={true}>
                          <AddButton hasBorder={true}>
                          </AddButton>
                        </Square>
                      )
                    })
                  }
                </div>

                <div class="w-2/3">
                  <Square innerClass={boxPadding} isRatioVisible={true}>
                    <AddButton hasBorder={true}>
                </AddButton>
                  </Square>
                </div>
              </div>

              {/* lower row */}
              <div class="">
                <Rectangle innerClass={boxPadding} ratio={"2/3"} isRatioVisible={true}>
                  <AddButton hasBorder={true}>
                  </AddButton>
                </Rectangle>
              </div>
            </div>

            {/* right col */}
            <div class="flex flex-col w-2/5">
              <Rectangle innerClass={boxPadding} ratio={"1/2"} isRatioVisible={true}>
                <AddButton hasBorder={true}>
                </AddButton>
              </Rectangle>

              <Rectangle innerClass={boxPadding} ratio={"3/2"} isRatioVisible={true}>
                <AddButton hasBorder={true}>
                </AddButton>
              </Rectangle>
            </div>
          </div>

          <div id="row_4" class="flex flex-row w-full" style={orderList().length === 6 ? { order: orderList()[4]} : ""}>
            <div class="w-2/5">
            <Rectangle innerClass={boxPadding} ratio={"1/2"} isRatioVisible={true}>
              <AddButton hasBorder={true}>
              </AddButton>
            </Rectangle>
            </div>

            <div class="w-3/5">
              <Rectangle innerClass={boxPadding} ratio={"1/3"} isRatioVisible={true}>
                <AddButton hasBorder={true}>
                </AddButton>
              </Rectangle>
            </div>
          </div>

          <div id="row_5" class="flex flex-row w-full" style={orderList().length === 6 ? { order: orderList()[5]} : ""}>
            <Rectangle innerClass={boxPadding} ratio={"1/5"} isRatioVisible={true}>
              <AddButton hasBorder={true}>
              </AddButton>
            </Rectangle>
          </div>
      </section>
    </>
  );
}

/*
export default function Layout() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Layout Page
      </h1>
      <p class="mt-8">
        [Insert content here]
      </p>

      <div class="m-auto w-40">
      <Square innerClass={boxPadding}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Square>
      </div>
    </main>
  );
}
*/