
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';
import { Phone, Mail, MapPin, Clock, Share2, Save } from 'lucide-react';

const ContactManager: React.FC = () => {
    const { siteSettings, updateSiteSettings } = useData();
    const [formData, setFormData] = useState(siteSettings);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setFormData(siteSettings);
    }, [siteSettings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSiteSettings(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <AdminLayout title="Əlaqə Məlumatları">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Əlaqə və Sosial Media</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <h5 className="border-bottom pb-2 text-primary font-weight-bold">
                                    <Phone className="inline-block mr-2 h-5 w-5" />
                                    Ümumi Məlumatlar
                                </h5>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Səhifə Başlığı (Contact Title)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.contactTitle}
                                        onChange={e => setFormData({ ...formData, contactTitle: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Səhifə Alt Başlığı</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.contactSubtitle}
                                        onChange={e => setFormData({ ...formData, contactSubtitle: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><Phone className="inline-block mr-1 h-3 w-3" /> Telefon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.phoneNumber}
                                        onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><Mail className="inline-block mr-1 h-3 w-3" /> E-poçt</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><MapPin className="inline-block mr-1 h-3 w-3" /> Ünvan</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><Clock className="inline-block mr-1 h-3 w-3" /> İş Saatları</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.workingHours}
                                        onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="col-12 mt-4 mb-4">
                                <h5 className="border-bottom pb-2 text-primary font-weight-bold">
                                    <Share2 className="inline-block mr-2 h-5 w-5" />
                                    Sosial Media
                                </h5>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Instagram URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.instagramUrl}
                                        onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>LinkedIn URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.linkedinUrl}
                                        onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Facebook URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.facebookUrl}
                                        onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>WhatsApp Nömrəsi (Məs: 99450xxxxxxx)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.whatsappNumber}
                                        onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary float-right">
                            <Save className="inline-block mr-2 h-4 w-4" />
                            {success ? 'Yadda Saxlanıldı!' : 'Yadda Saxla'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ContactManager;
