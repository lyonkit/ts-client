import { resolve } from 'node:path'
import {
  addImports,
  addPluginTemplate,
  addTemplate, createResolver,
  defineNuxtModule, resolveModule,
} from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
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
    const { resolve: metaResolver } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: metaResolver('./runtime') })

    // Inject options via virtual template
    nuxt.options.alias['#lyonkit'] = addTemplate({
      filename: 'lyonkit.mjs',
      src: resolve(__dirname, 'runtime/templates/composable'),
      options: {
        config: opts,
      },
    }).dst!

    addPluginTemplate({
      filename: 'lyonkit-plugin.mjs',
      src: resolveRuntimeModule('./runtime/templates/plugin'),
      options: {
        apiKey: opts.apiKey,
        readOnly: opts.readOnly ?? false,
      },
    })

    addImports({
      name: 'useLyonkit',
      from: resolve(__dirname, 'runtime/imports/lyonkit.ts'),
      as: 'useLyonkit',
    })

    nuxt.hook('prepare:types', (config) => {
      config.references.push({
        path: opts.readOnly ? resolve(__dirname, 'runtime/types/readonly.d.ts') : resolve(__dirname, 'runtime/types/write.d.ts'),
      })
    })
  },
})
