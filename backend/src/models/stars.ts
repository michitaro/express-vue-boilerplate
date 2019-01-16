import * as ldap from 'ldapjs'
import * as config from '~/shared/config'


export async function checkPassword(uid: string, password: string) {
  await new Promise((resolve, reject) => {
    const stars = ldap.createClient({ url: config.starsUrl })
    stars.bind(`uid=${uid},ou=People,dc=stars,dc=nao,dc=ac,dc=jp`, password, (error, result) => {
      if (error)
        reject(error)
      else
        resolve()
    })
  })
}


export async function profile(uid: string) {
  const stars = ldap.createClient({ url: config.starsUrl })
  const attributes = await new Promise<{ [type: string]: string }>((resolve, reject) => {
    stars.search(`uid=${uid},ou=People,dc=stars,dc=nao,dc=ac,dc=jp`, {}, (error, res) => {
      if (error) {
        reject(error)
      }
      else {
        const attributes: { [key: string]: any } = {}
        res.on('error', error => {
          reject(error)
        })
        res.on('searchEntry', result => {
          for (const a of result.attributes) {
            if (a.vals.length == 1) {
              attributes[a.type] = a.vals[0]
            }
          }
        })
        res.on('end', _ => {
          resolve(attributes)
        })
      }
    })
  })
  const groups = await new Promise<string[]>((resolve, reject) => {
    stars.search('ou=group,dc=stars,dc=nao,dc=ac,dc=jp', { scope: 'one', filter: `memberUid=${uid}` }, (error, res) => {
      if (error) {
        reject(error)
      }
      else {
        const groups: string[] = []
        res.on('error', error => {
          reject(error)
        })
        res.on('searchEntry', result => {
          const [group] = result.attributes.filter((a: any) => a.type == 'cn' && a.vals.length == 1).map((a: any) => a.vals[0])
          groups.push(group)
        })
        res.on('end', _ => {
          resolve(groups)
        })
      }
    })
  })
  return { attributes, groups }
}