#!/usr/bin/env node

import openConfig from './openConfig'
import getRepositories from './getRepositories'
import config from './config.json'
import command from './command'
import { blueBright as info, greenBright as success, bold } from 'chalk'
import path from 'path'

if (process.argv[2] === 'config') {
    openConfig()
} else {
    const repositories = getRepositories((process.argv[2] || config.DIST_SRC).replace('"', ''))

    console.log(info('>> Folder'))
    console.log(info(`  >> Input Path "${(process.argv[2] || config.DIST_SRC).replace('"', '')}"`))
    console.log(info(`  >> Complete Path "${path.resolve((process.argv[2] || config.DIST_SRC).replace('"', ''))}"`))

    repositories.map(repository => 
        command(`cd ${repository.path} && git fetch`, () => 
            console.log(success(`>> Repository ${repository.name} ${bold('checked')}`))
        )
    )
}