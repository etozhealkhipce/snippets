type Nullable<T> = T | null;

const text: Nullable<HTMLDivElement> = document.getElementById(
  "text"
) as HTMLDivElement;
const input: Nullable<HTMLInputElement> = document.getElementById(
  "input"
) as HTMLInputElement;

if (!text || !input) {
  throw new Error("нет полей");
}

const data = {
  title: "",
};

input.addEventListener("keyup", (e) => {
  if (e !== null) {
    data.title = e.target.value;
  }
});

Object.defineProperty(data, "title", {
  set(newVal) {
    text.textContent = newVal;
  },
});

export default Nullable;
