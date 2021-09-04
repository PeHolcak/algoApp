const speed = 2;

const compare = (a, b) => (a.value > b.value ? -1 : 1);

const shouldSwap = (i, j, arr) => (
    i >= 0 && j >= 0
    && i < arr.length
    && j < arr.length
    && compare(arr[j], arr[i]) > 0
  );

export async function bubbleSort(arr, chooseSelected, clearPreviousChoose, swap) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        clearPreviousChoose();
        await new Promise(resolve => setTimeout(resolve, speed));
        for (var j = 0; j < len - 1 - i; j++) {
            chooseSelected(arr[j].position,arr[j + 1].position);
            await new Promise(resolve => setTimeout(resolve, speed));
                if (arr[j].value > arr[j + 1].value) {
                    swap(arr[j].position, arr[j + 1].position)
                    var temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
            }
        }
    }
    return arr;
}

export async function selectionSort(arr, chooseSelected, clearPreviousChoose, swap) {
    for (let i = 0; i < arr.length - 1; i += 1) {
      clearPreviousChoose();
      let selectedIndex = i;
      chooseSelected(arr[i,null]);
  
      for (let j = i + 1; j < arr.length; j += 1) {
        if (shouldSwap(selectedIndex, j, arr)) {
          selectedIndex = j;
          chooseSelected(arr[i,j]);
        }
      }
  
      if (selectedIndex !== i) {
        swap(selectedIndex, i);
      }
    }
    return arr;
  };

  export async function heapSort(arr, chooseSelected, clearPreviousChoose, swap) {
    for (let i = 1; i < arr.length; i += 1) {
      clearPreviousChoose()
      let insertionIndex = i;
      chooseSelected(arr[i,null]);
  
      for (let j = i - 1; j >= 0; j -= 1) {
          console.log("shouldSwap(j, insertionIndex, arr)",shouldSwap(j, insertionIndex, arr), arr, chooseSelected, clearPreviousChoose, swap);
        if (shouldSwap(j, insertionIndex, arr)) {
          swap(j, insertionIndex);
          insertionIndex = j;
          chooseSelected(arr[i,j]);
        }
      }
    }
  
    return arr;
  };

