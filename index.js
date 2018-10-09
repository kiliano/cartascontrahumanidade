
'use strict'

var http = require('http');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const axios = require('axios');
var wordpress = require( "wordpress" );


// Middlewares

const exec = (ctx, ...middlewares) => {
	const run = current => {
		middlewares && current < middlewares.length && middlewares[current](ctx,() => run(current +1 ))
	}
	run(0)
}
const ctx = {}

// Data de nascimento do bot: 17/09/2018





// Chamadas para o Local
	const env = require('./.env');
	const bot = new Telegraf(env.token);
	const apiUrl = env.apiUrl;
	const apiFileUrl = env.apiFileUrl;
	const idKiliano = env.idKiliano;
	const wordpressPass = env.wordpressPass;


// Chamadas para o Heroku
	// var port = (process.env.PORT || 5000)

	// http.createServer(function(request, response) {
	// 	response.writeHead(200,{'Content-Type': 'application/json'});
	// 	response.write(JSON.stringify({name: 'cartas', ver: '0.1'}));
	// 	response.end();
	// }).listen(port)

	// const token = process.env.token

	// const idKiliano = process.env.idKiliano
	// const wordpressPass = process.env.wordpressPass;
	// const apiUrl = `https://api.telegram.org/bot${token}`
	// const apiFileUrl = `https://api.telegram.org/file/bot${token}`
	// const bot = new Telegraf(token)


// Código



// Login WP
var wp = wordpress.createClient({
    url: "http://api.degraupublicidade.com.br",
    username: "tiodopao",
    password: wordpressPass
});


// mensagem
const msg = (msg, id) => {
	axios.get(`${apiUrl}/sendMessage?chat_id=${id}&text=${encodeURI(msg)}`)
		.catch(e => console.log(e))
}

const carregartodos = (ctx, next) => {
	// Carregando conteúdo online
	wp.getPosts({
		type: "cpt-pao",
		number: "9999"
	},["title","date", "customFields"],function( error, posts, data ) {
	    conteudo = posts;
	    conteudo = JSON.stringify(conteudo);
	    if (conteudo.length > 0) {
		    conteudo = JSON.parse(conteudo);
		    conteudoprimeiro = conteudo[0];
	    }
	    console.log( "Carregando " + conteudo.length + " posts!" );
	    console.log( "Último post:" );
	    console.log(conteudoprimeiro);
	    next()
	});
}





// Teclados

// Pedido em mensagem direta
const tecladoPao = Markup.keyboard([
	['🍞 Pão Francês', '🌽 Pão de Milho'],
	['🍩 Rosquinha', '🍩 com Recheio'],
	['🥐 Croissant Presunto', '🥐 Croissant Frango'],
	['🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme'],
	['❌Não quero pedir pão❌']

]).resize().oneTime().extra()


// botões fixos

// Criação de comandos

bot.command(['pao','Pao','pedir', 'cardapio'], async ctx => {

	if (acordado == true) {
		if (ctx.update.message.from.id == ctx.chat.id) {
		} else {
		}
	} else {
		await ctx.reply("💤💤💤")
	}
})


// Ouvindo o pedido
bot.hears(['🍞 Pão Francês', '🌽 Pão de Milho', '🍩 Rosquinha', '🍩 com Recheio','🥐 Croissant Presunto', '🥐 Croissant Frango','🥖 Bisnaga','🥖 com Açúcar','🥖 com Creme'], async ctx => {

})




// ----- Comandos e actions não relacionados ao pão ------


// Testes

bot.command(['teste'], async ctx => {
	await ctx.reply("Testado");

})


// / Código



// Loop
bot.startPolling()