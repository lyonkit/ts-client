import { readFileSync } from 'node:fs'
import { template } from 'lodash-es'
import {
  addImports,
  addPluginTemplate,
  addTemplate,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import { join } from 'pathe'
import { name, version } from '../package.json'

export interface ModuleOptions {
  /**
   * Lyonkit Api Key to use backend
   * You can also use runtime config 'lyonkitApiKey'
   */
  apiKey?: string
  /**
   * Set to false if you want to use write commands
   * @default false
   */
  readOnly?: boolean
  /**
   * Endpoint URL
   */
  endpoint?: string
}

export default <NuxtModule<ModuleOptions>> defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'lyonkit',
    compatibility: {
      nuxt: '^3.0.0-rc.4',
    },
  },
  defaults: {
    readOnly: true,
  },
  async setup(opts, nuxt) {
    const resolver = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => join(resolver.resolve('./runtime'), path)

    // Inject options via virtual template
    nuxt.options.alias['#lyonkit'] = addTemplate({
      filename: 'lyonkit.mjs',
      getContents({ options }) {
        const contents = readFileSync(resolveRuntimeModule('./templates/composable'), 'utf-8')
        return template(contents)({ options })
      },
      options: {
        config: opts,
      },
    }).dst!

    addPluginTemplate({
      filename: 'lyonkit-plugin.mjs',
      getContents({ options }) {
        const contents = readFileSync(resolveRuntimeModule('./templates/plugin'), 'utf-8')
        return template(contents)({ options })
      },
      options: {
        apiKey: opts.apiKey,
        readOnly: opts.readOnly ?? false,
        endpoint: opts.endpoint,
      },
    })

    addImports({
      name: 'useLyonkit',
      from: resolveRuntimeModule('./imports/lyonkit'),
      as: 'useLyonkit',
    })

    nuxt.hook('prepare:types', (config) => {
      config.references.push({
        path: opts.readOnly ? resolveRuntimeModule('./types/readonly.d.ts') : resolveRuntimeModule('./types/write.d.ts'),
      })
    })
  },
})
