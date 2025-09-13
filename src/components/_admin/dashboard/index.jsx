'use client';
import React from 'react';
import PropTypes from 'prop-types';
// mui
import { Grid, Box } from '@mui/material';
// components
import DashboardCard from 'src/components/_admin/dashboard/dashboardCard';
import LowStockProducts from 'src/components/_admin/dashboard/lowStockProducts';
import OrderChart from 'src/components/charts/order';
import SaleChart from 'src/components/charts/sale';
import IncomeChart from 'src/components/charts/income';
import BestSelling from './bestSelling';
// icon
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { PiUsersThree } from 'react-icons/pi';
import { BsShop } from 'react-icons/bs';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { GrWorkshop } from 'react-icons/gr';
import { LuFileClock } from 'react-icons/lu';
import { FiFileText } from 'react-icons/fi';
import { LuFileInput } from 'react-icons/lu';
// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
Dashboard.propTypes = { isVendor: PropTypes.bool };
export default function Dashboard({ isVendor }) {
  const { data: dashboard, isPending: isLoading } = useQuery({
    queryKey: [isVendor ? 'vendor-analytics' : 'dashboard-analytics'],
    queryFn: api[isVendor ? 'vendorDashboardAnalytics' : 'adminDashboardAnalytics']
    // refetchInterval: 10000, // Uncomment if you want periodic refetch
  });
  const data = dashboard?.data || {};
  const daily_earning = data?.dailyEarning;
  const daily_orders = data?.dailyOrders;
  const daily_users = data?.totalUsers;
  const totalProducts = data?.totalProducts;
  const sales_report = data?.salesReport;
  const income_report = data?.incomeReport;
  const commission_report = data?.commissionReport;
  const orders_report = data?.ordersReport;
  const bestSellingProducts = data?.bestSellingProducts;
  const totalVendors = data?.totalVendors;
  const totalShops = data?.totalShops;
  const totalPendingOrders = data?.totalPendingOrders;
  const totalReturnOrders = data?.totalReturnOrders;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ md: 3, sm: 6, xs: 12 }}>
          <DashboardCard
            color="primary"
            isAmount
            icon={<AiOutlineDollarCircle size={24} />}
            title="Daily Earning"
            value={daily_earning}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={{ md: 3, sm: 6, xs: 12 }}>
          <DashboardCard
            color="secondary"
            title="Daily Orders"
            value={daily_orders}
            icon={<FiFileText size={24} />}
            isLoading={isLoading}
          />
        </Grid>
        {!isVendor && (
          <Grid size={{ md: 3, sm: 6, xs: 12 }}>
            <DashboardCard
              color="warning"
              title="Total Users"
              value={daily_users}
              icon={<PiUsersThree size={30} />}
              isLoading={isLoading}
            />
          </Grid>
        )}

        <Grid size={{ md: 3, sm: isVendor ? 12 : 6, xs: 12 }}>
          <DashboardCard
            color="error"
            title="Total Products"
            value={totalProducts}
            icon={<BiSolidShoppingBags size={24} />}
            isLoading={isLoading}
          />
        </Grid>
        {!isVendor && (
          <Grid size={{ xs: 12, sm: isVendor ? 12 : 6, md: 3 }}>
            <DashboardCard
              color="success"
              title="Total Vendors"
              value={totalVendors}
              icon={<GrWorkshop size={24} />}
              isLoading={isLoading}
            />
          </Grid>
        )}
        {!isVendor && (
          <Grid size={{ xs: 12, sm: isVendor ? 12 : 6, md: 3 }}>
            <DashboardCard
              color="info"
              title="Total Shop"
              value={totalShops}
              icon={<BsShop size={24} />}
              isLoading={isLoading}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: isVendor ? 12 : 6, md: 3 }}>
          <DashboardCard
            color="#01838F"
            title="Pending Orders"
            value={totalPendingOrders}
            icon={<LuFileClock size={24} />}
            isLoading={isLoading}
          />
        </Grid>
        {!isVendor && (
          <Grid size={{ xs: 12, sm: isVendor ? 12 : 6, md: 3 }}>
            <DashboardCard
              color="#AFB42B"
              title="Retruned Orders"
              value={totalReturnOrders}
              icon={<LuFileInput size={24} />}
              isLoading={isLoading}
            />
          </Grid>
        )}

        <Grid size={{ lg: 7, md: 7, xs: 12 }}>
          <SaleChart data={sales_report} isLoading={isLoading} />
        </Grid>
        <Grid size={{ lg: 5, md: 5, xs: 12 }}>
          <OrderChart data={orders_report} isLoading={isLoading} />
        </Grid>
        <Grid size={{ lg: 4, md: 4, xs: 12 }}>
          <BestSelling data={bestSellingProducts} loading={isLoading} isVendor={isVendor} />
        </Grid>
        <Grid size={{ lg: 8, md: 8, xs: 12 }}>
          <IncomeChart
            income={income_report}
            commission={commission_report}
            isVendor={isVendor}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={12}>
          <LowStockProducts isVendor={isVendor} />
        </Grid>
      </Grid>
    </Box>
  );
}
