
//Peventing the automatic form-submit
$('#btn').click(e => {
    e.preventDefault();
    console.log('It did not refresh!')
    //setting the value of each input to a variable
    const User = $('#User').val();
    const Chirp = $('#Chirp').val();

    //Using POST method to add
    $.ajax({
        type: 'POST',
        url: 'api/chirps',
        data: { User, Chirp }
    })
        .then(response => {
            console.log(response);
            displayChirps();
        });


    $('#User').val('');
    $('#Chirp').val('');
});

displayChirps();

//Using GET to retrieve the "api/chirps" endpoint.
function displayChirps() {
    $.ajax({
        type: 'GET',
        url: 'api/chirps'
    })
        .then(chirpChirps => {
            $('#container').empty()
            //For/in loop is able to loop through properties in objects
            for (const id in chirpChirps) {
                if (id === "nextid") {
                    return;
                }


                const deleteChirp = $('<button>Delete Chirp</button>').click(() => {
                    console.log(id);
                    $.ajax({
                        type: 'DELETE',
                        url: `api/chirps/${id}`
                    })
                        .then(deletedChirps => {
                            console.log(deletedChirps);
                            displayChirps();
                        })
                })

                //This doesn't work lol, but I came close.
                const editChirp = $('<button>Edit Chirp</button>').click(() => {
                    Swal.fire({
                        title: 'Edit this Chirp',
                        html:
                            '<input id="input1" class="swal2-input">' +
                            '<input id="input2" class="swal2-input">',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Chirp new Chirp',
                        showLoaderOnConfirm: true,
                        preConfirm: (User, Chirp) => {
                            $.ajax({
                                type: 'PUT',
                                url: `api/chirps/${id}`,
                                data: { User, Chirp }
                            }).then(response => {
                                console.log(response);
                                const User = $('#User').val();
                                const Chirp = $('#Chirp').val();
                                console.log({ User, Chirp })
                                displayChirps();
                            })
                                .catch(err => {
                                    console.log(err)
                                    console.log('Chirp was not updated!');
                                })
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((response) => {
                        if (response.isConfirmed) {
                            Swal.fire({
                                title: "You Updated Chirp!"
                            })
                        }
                    })

                })






                $(`
                <ul>
                    <h1>@${chirpChirps[id].User}:</h1>
                    <h2>${chirpChirps[id].Chirp}</h2>
                </ul
    
            `).appendTo(`#container`)
                    .append(deleteChirp)
                    .append(editChirp);

            }
        })

}

