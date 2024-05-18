const butInstall = document.getElementById('buttonInstall');


// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //beforeinstallprompt event is fired when the app is ready to be installed
    //prevent the default behavior of the event
    event.preventDefault();

    //store the event for later use
    window.deferredPrompt = event;

    //show the install button
    butInstall.style.display = 'block'
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    //prompt the user to install the app
    window.deferredPrompt.prompt();

    //wait for the user to respond to the prompt
    const { outcome } = await window.deferredPrompt.userChoice;

    //if the user accepts the prompt, hide the install button
    if (outcome === 'accepted') {

        butInstall.style.display = 'none';
    }

    //clear the deferredPrompt
    window.deferredPrompt = null
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    //prompt the user that the app has been installed
    alert('App installed')
});
