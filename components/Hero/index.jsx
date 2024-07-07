import initTranslations from '@/app/i18n';

export const Hero = async ({ lng }) => {
    const { t } = await initTranslations(lng, ['hero']);
    return (
        <section className=''>
            <div>
                <p>Hero</p>
            </div>
        </section>
    )
}