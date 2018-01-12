// window.addEventListener('load', function() {
//     // Add new ingredient select and text field
//     document.getElementById('add-more-ingredient').addEventListener('click', function() {
//         let addMore = document.createElement('div');
//         addMore.innerHTML = `<div class="col-sm-4 mb-1">
//                             <select class="btn dropdown-toggle" name="quantity" id="quantity">
//                                     <option value="">Select quantity</option>
//                                     <option value="1">1</option>
//                                     <option value="2">2</option>
//                                     <option value="3">3</option>
//                             </select>
//                         </div>
//                         <div class="col-sm-8">
//                             <div>
//                                 <input type="text" name="ingredient[]" id="ingredient" class="form-control" required>
//                             </div>
//                         </div>`;
//         document.getElementById('recipe-quantity').append(addMore);
//     });

//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             console.log(this.files[0]);
//             let img = document.querySelector('img');
//             img.src = URL.createObjectURL(this.files[0]);
//         }
//     });
// });
