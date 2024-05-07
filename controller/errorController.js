const express = require('express');

exports.renderError = (req, res, next) => {
    res.render('error/erro', { msg: 'Erro' });
}