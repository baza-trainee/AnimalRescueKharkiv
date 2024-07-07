import initTranslations from '@/app/i18n';

export const Footer = async ({ lng }) => {
    const { t } = await initTranslations(lng, ['footer']);
    return (
        <section className=''>
            <div>
                <p>Footer</p>
            </div>
        </section>
    )
}