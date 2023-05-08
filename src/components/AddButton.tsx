import { createEffect, createSignal, on, useContext } from "solid-js";
import Content from "./Content";
import { PlaceholderBGContext } from "~/routes/layout";

const artstationCDNA = "https://cdna.artstation.com/p/assets/images/images";
const artstationCDNB = "https://cdnb.artstation.com/p/assets/images/images";

export default function AddButton(props:  {children: any, hasBorder?: boolean, bgUrl?: string}) {
  const [bgImage, setBgImage] = createSignal("");
  const [isInputVisible, setIsInputVisible] = createSignal(false);

  // TypeError: (intermediate value)(...) is undefined
  const {isPlaceholderBgVisible} = useContext(PlaceholderBGContext);

  let inputRef: HTMLInputElement;

  createEffect(() => {
    if(isInputVisible()){
      inputRef.focus();
    }
  }, 0);

  createEffect(() => {
    setBgImage((!!isPlaceholderBgVisible() && props.bgUrl) ? props.bgUrl : "");
  });

  function setBackgroundImage(e: any) {
    const url = e.currentTarget.value.trim();
    if(e.key === "Enter"){
      setBgImage(url.startsWith(artstationCDNA) || url.startsWith(artstationCDNB) ? url : "");
      setIsInputVisible(false);
    }else if(e.type === "focusout"){
      if(bgImage() === "" || (url.startsWith(artstationCDNA) || url.startsWith(artstationCDNB))){
        setBgImage(url);
        setIsInputVisible(false);
      };
    };
  };

  const PlusSVG = () => {return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )};

  const ToggleInputBttn = () => {
    return (!isInputVisible() &&
    <button class="absolute top-1 right-1 opacity-10"
      onClick={(e) => {
        setIsInputVisible(!isInputVisible());
        e.stopPropagation();
      }}
    >az
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
      </svg>
    </button>)
  };

  return (
    <Content hasBorder={props.hasBorder}>
      {isInputVisible() ?
        <section class="absolute z-10 p-2
        w-full h-full
        flex justify-center items-center
        bg-black/[.25]"
        onClick={() => setIsInputVisible(false)}>
          <div class="flex flex-col">
            <input type="text"
              class="w-full"
              ref={inputRef!}
              onkeypress={(e) => setBackgroundImage(e)}
              onClick={(e) => e.stopPropagation()}
              onFocusOut={(e) => setBackgroundImage(e)}
            />
          </div>
        </section> : <></>
      }

      <div class={`flex justify-center items-center
        w-full h-full relative
        text-gray-200 hover:text-gray-300 hover:font-extrabold
        bg-center bg-cover bg-no-repeat`}
        style={bgImage() && {"background-image": "url('"+bgImage()+"')"}}
        >
        {ToggleInputBttn()}
        {bgImage() ? <></> : PlusSVG()}
        {props.children}
      </div>
    </Content>
  );
}

/**
gradient reminder
hover:bg-gradient-to-b from-slate-50 to-slate-100
 */