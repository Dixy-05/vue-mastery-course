<template lang="pug">
div.networkError
	h1 Uh-oh!
	h3 
		|It looks like you're experiencing some network issues, please take a breath and 
		a(href='#' @click="$router.go(-1)") click here
		|
		|to try again.
</template>
