import initTranslations from '@/app/i18n';

export const NumberOfHostsForeign = async ({ lng }) => {
    const { t } = await initTranslations(lng, ['number-of-hosts-foreign']);
    return (
        <section className=''>
            <div>
                <p>Number of host in foreign coutries</p>
            </div>
        </section>
    )
}